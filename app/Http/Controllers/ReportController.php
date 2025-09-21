<?php 

namespace App\Http\Controllers;

use App\Http\Requests\BulkDeleteReportRequest;
use App\Http\Requests\BulkUpdateReportRequest;
use App\Http\Requests\RefreshNilaiReportRequest;
use App\Http\Requests\StoreReportRequest;
use App\Http\Requests\UpdateReportRequest;
use App\Models\AcademicYear;
use App\Models\Classroom;
use App\Models\Examscore;
use App\Models\Grade;
use App\Models\Report;
use App\Models\Score;
use App\Models\Setting;
use App\Models\Student;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $data = Report::query()
            ->with(['academic_year', 'classroom', 'student'])
            ->when($request->report_type, fn ($q, $v) => $q->where('report_type', $v))
            ->when($request->student_id, fn ($q, $v) => $q->where('student_id', $v));

        return Inertia::render('report/index', [
            'reports' => $data->get(),
            'query' => $request->input(),
            'academicYears' => AcademicYear::get(),
            'classrooms' => Classroom::get(),
            'students' => Student::get(),
            'reportTypes' => Report::$reportTypes,
            'permissions' => [
                'canAdd' => $this->user->can('create report'),
                'canUpdate' => $this->user->can('update report'),
                'canDelete' => $this->user->can('delete report'),
                'canShow' => $this->user->can('show report'),
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReportRequest $request)
    {
        $data = $request->validated();

        $settings = Setting::pluck('value', 'key');
        $student = Student::find($data['student_id']);
        $academicYear = AcademicYear::find($data['academic_year_id']);
        // $classroom = Classroom::find($data['classroom_id']);
        $classroom = Classroom::find($data['classroom_id']);

        $mockup = config('report-mockup')[$data['report_type']];
        $mockup['tahunajaran'] = $academicYear->year;
        $mockup['semester'] = $academicYear->semester;
        $mockup['nama'] = $student->name;
        $mockup['kelas'] = $classroom->name;
        $mockup['walikelas'] = $classroom->user->name ?? '';
        $mockup['usia'] = $student->umur;
        $mockup['nisn'] = $student->nisn;

        if ($data['report_type'] == 'perkembangan') {
            $mockup['tanggal'] = $settings['SCHOOL_CITY'].', '.now()->format('d F Y');

            $mockup['ketidakhadiran']['sakit'] = $student->absents->where('reason', 'sakit')->count() ?? 0;
            $mockup['ketidakhadiran']['izin'] = $student->absents->where('reason', 'izin')->count() ?? 0;
            $mockup['ketidakhadiran']['tanpa keterangan'] = $student->absents->where('reason', 'tanpa keterangan')->count() ?? 0;

            $mockup['ekskul'] = $student->activities->load(['extracurricular'])->map(function ($ekskul) {
                return [
                    'nama' => $ekskul->extracurricular->name,
                    'kegiatan' => $ekskul->description,
                ];
            });
        } elseif ($data['report_type'] == 'nilai') {
            $mockup['tanggal'] = $settings['SCHOOL_CITY'].', '.now()->format('d F Y');
            $mockup['rapor_kenaikan_kelas'] = $academicYear->semester === 'ganjil' ? false : true;
            $mockup['naik_kelas'] = null;
            $mockup['ke_kelas'] = '';

            $mockup['nilai'] = $classroom->lessons?->map(function ($lesson) use ($student) {

                $lesson = $lesson->load('exams.examscores', 'assignments.scores');
                $subject = $lesson->subject;

                $score = Score::whereStudentId($student->id)->whereLessonId($lesson->id)->get()->sum('rated_score') ?? 0;
                $examscore = Examscore::whereStudentId($student->id)->whereLessonId($lesson->id)->get()->sum('rated_score') ?? 0;

                return [
                    'name' => $subject->name,
                    'type' => $subject->group,
                    'nilai_tugas' => $score,
                    'evaluasi' => $examscore,
                    'rata_rata' => ($score + $examscore) / 2,
                ];
            });
        } elseif ($data['report_type'] == 'tahfidz') {
            $mockup['tanggal'] = $settings['SCHOOL_CITY'].', '.now()->format('d F Y');
            $mockup['pembimbing'] = $settings['PEMBIMBING_TAHFIDZ'];
            $mockup['koordinator'] = $settings['KOORDINATOR_Al-MUYASSAR'];
            $mockup['catatan'] = "Semoga ananda {$student->name} tetap rajin muroja'ah di rumah agar hafalan Surah Al Qur'an-nya tetap terjaga";
        } elseif ($data['report_type'] == 'tahsin') {

        }

        $data['data'] = $mockup;

        Report::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Report $report)
    {
        return Inertia::render('report/show', [
            'report' => $report->load('student', 'classroom', 'academic_year'),
            'student' => $report->student->load('activities', 'activities.extracurricular', 'absents'),
            'classroom' => $report->classroom,
            'grades' => Grade::get(),
            'permissions' => [
                'canUpdate' => $this->user->can('update report'),
                'canAddParentComment' => $this->user->can('comment report'),
            ],
        ]);
    }

    public function edit(Report $report)
    {
        return Inertia::render('report/edit', [
            'report' => $report->load('student', 'classroom', 'academic_year'),
            'student' => $report->student->load('activities', 'activities.extracurricular', 'absents'),
            'classroom' => $report->classroom,
            'grades' => Grade::get(),
        ]);
    }

    public function raw(Report $report)
    {
        return response()->json($report, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReportRequest $request, Report $report)
    {
        $data = $request->validated();
        $report->update($data);
    }

    public function refreshNilai(RefreshNilaiReportRequest $request, Report $report)
    {
        $request->validated();

        $classroom = $report->classroom;
        $student = $report->student;

        $mockup = $report->data;

        $mockup['nilai'] = $classroom->lessons?->map(function ($lesson) use ($student) {
            $lesson = $lesson->load('exams.examscores', 'assignments.scores');
            $subject = $lesson->subject;

            $score = Score::whereStudentId($student->id)->whereLessonId($lesson->id)->get()->sum('rated_score') ?? 0;
            $examscore = Examscore::whereStudentId($student->id)->whereLessonId($lesson->id)->get()->sum('rated_score') ?? 0;

            return [
                'name' => $subject->name,
                'type' => $subject->group,
                'nilai_tugas' => $score,
                'evaluasi' => $examscore,
                'rata_rata' => ($score + $examscore) / 2,
            ];
        });

        $report->update([
            'data' => $mockup
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Report $report)
    {
        $report->delete();
    }

    /**
     * BulkUpdate the specified resource from storage.
     */
    public function bulkUpdate(BulkUpdateReportRequest $request)
    {
        $data = $request->validated();
        Report::whereIn('id', $data['report_ids'])->update($data);
    }

    /**
     * BulkDelete the specified resource from storage.
     */
    public function bulkDelete(BulkDeleteReportRequest $request)
    {
        $data = $request->validated();
        Report::whereIn('id', $data['report_ids'])->delete();
    }

    public function download(Report $report)
    {
        $data = collect($report->data);
        if ($report->report_type == 'perkembangan') {
            return Pdf::setOption('paper', 'a4')->loadView('pdf.perkembangan', [
                'data' => $data,
                'settings' => Setting::pluck('value', 'key'),
                'report' => $report,
            ])->stream($report->name);
        } elseif ($report->report_type == 'nilai') {
            return Pdf::setOption('paper', 'a4')->loadView('pdf.nilai', [
                'data' => $data,
                'settings' => Setting::pluck('value', 'key'),
                'report' => $report,
            ])->stream($report->name);
        } elseif ($report->report_type == 'tahfidz') {
            return Pdf::setOption('paper', 'a4')->loadView('pdf.tahfidz', [
                'data' => $data,
                'settings' => Setting::pluck('value', 'key'),
                'report' => $report,
            ])->stream($report->name);
        }

        return abort(404);
    }
}
