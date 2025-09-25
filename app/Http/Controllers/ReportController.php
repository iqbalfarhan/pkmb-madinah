<?php

namespace App\Http\Controllers;

use App\AnyFormatter;
use App\Helpers\ReportHelper;
use App\Http\Requests\BulkDeleteReportRequest;
use App\Http\Requests\BulkUpdateReportRequest;
use App\Http\Requests\RefreshNilaiReportRequest;
use App\Http\Requests\StoreReportRequest;
use App\Http\Requests\UpdateReportRequest;
use App\Models\AcademicYear;
use App\Models\Assessment;
use App\Models\Classroom;
use App\Models\Examscore;
use App\Models\Grade;
use App\Models\Report;
use App\Models\Score;
use App\Models\Setting;
use App\Models\Student;
use App\Models\User;
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

        $activeAcademicYearSemester = AcademicYear::active()->semester;
        $settings = Setting::pluck('value', 'key');
        $student = Student::find($data['student_id']);
        $academicYear = AcademicYear::find($data['academic_year_id']);
        $classroom = Classroom::find($data['classroom_id']);
        $assessments = Assessment::query()
            ->whereIn('group', ["doa harian", "hadist"])
            ->where('grade_id', $classroom->grade_id)
            ->where('semester', $activeAcademicYearSemester)
            ->get();

        // dd($classroom->grade_id, $assessments->toArray(), $activeAcademicYearSemester);

        $mockup = ReportHelper::generateReportData($data, $student, $academicYear, $classroom, $assessments, $settings);
        $data['data'] = $mockup;

        $report = Report::create($data);

        return redirect()->route('report.show', $report->id);
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
            'teachers' => User::role('guru')->get(),
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

        $report->load(['classroom', 'student']);
        $student = Student::find($report->student_id);
        $classroom = Classroom::find($report->student_id);

        $mockup = $report->data;
        $mockup['nilai'] = ReportHelper::generateLessonScores( $student, $classroom);

        $report->update([
            'data' => $mockup,
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
        $reportType = $report->report_type;
        $allowed = [
            "perkembangan",
            "nilai",
            "tahfidz",
            "tahsin",
            "doa-hadist",
        ];

        if (in_array($reportType, $allowed)) {
            return Pdf::setOption('paper', 'a4')->loadView("pdf.{$reportType}", [
                'data' => $data,
                'settings' => Setting::pluck('value', 'key'),
                'report' => $report,
            ])->stream($report->name);
        }

        return abort(404);
    }
}
