<?php

namespace App\Http\Controllers;

use App\Http\Requests\BulkDeleteStudentRequest;
use App\Http\Requests\BulkUpdateStudentRequest;
use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Http\Requests\UploadStudentMediaRequest;
use App\Models\Absent;
use App\Models\AcademicYear;
use App\Models\Activity;
use App\Models\Assignment;
use App\Models\Bill;
use App\Models\Classroom;
use App\Models\Extracurricular;
use App\Models\Family;
use App\Models\Lesson;
use App\Models\PaymentType;
use App\Models\Report;
use App\Models\Score;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Inertia\Inertia;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $data = Student::query()
            ->with(['user', 'grade', 'classroom'])
            ->orderBy('grade_id')
            ->when($request->grade_id, function ($q, $v) {
                $q->where('grade_id',  $v);
            });

        return Inertia::render('student/index', [
            'students' => $data->aktif()->get(),
            'query' => $request->input(),
            'users' => User::role('orangtua')->get(),
            'classrooms' => Classroom::active()->get(),
            'statusLists' => Student::$statusLists,
            'permissions' => [
                'canAdd' => $this->user->can('create student'),
                'canUpdate' => $this->user->can('update student'),
                'canDelete' => $this->user->can('delete student'),
                'canShow' => $this->user->can('show student'),
            ],
        ]);
    }

    /**
     * create a new student.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStudentRequest $request)
    {
        $data = $request->validated();
        Student::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Student $student)
    {
        return Inertia::render('student/show', [
            'student' => $student->load(['user', 'grade', 'classroom', 'family', 'prevschool', 'media', 'absents']),
            'sallaryLists' => Family::$sallaryLists,
            'classrooms' => [$student->classroom],
            'permissions' => [
                'canUpdate' => $this->user->can('update student'),
            ],
        ]);
    }

    /**
     * edit the specified student.
     */
    public function edit(Student $student)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStudentRequest $request, Student $student)
    {
        $data = $request->validated();
        $student->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Student $student)
    {
        $data = $request->validate([
            'status' => 'required|in:'.implode(',', Student::$statusLists),
        ]);
        $student->update($data);

        $student->delete();
    }

    /**
     * BulkUpdate the specified resource from storage.
     */
    public function bulkUpdate(BulkUpdateStudentRequest $request)
    {
        $data = $request->validated();
        $ids = $data['student_ids'];

        $updates = Arr::except($data, ['student_ids']);

        // dd($updates, $ids);
        foreach ($ids as $id) {
            Student::find($id)->update($updates);
        }
    }

    /**
     * BulkDelete the specified resource from storage.
     */
    public function bulkDelete(BulkDeleteStudentRequest $request)
    {
        $data = $request->validated();
        Student::whereIn('id', $data['student_ids'])->delete();
    }

    /**
     * View archived resource from storage.
     */
    public function archived()
    {
        return Inertia::render('student/archived', [
            'students' => Student::onlyTrashed()->get(),
        ]);
    }

    /**
     * Restore the specified resource from storage.
     */
    public function restore($id)
    {
        $model = Student::onlyTrashed()->findOrFail($id);
        $model->restore();

        $model->update([
            'status' => 'aktif',
        ]);
    }

    /**
     * Force delete the specified resource from storage.
     */
    public function forceDelete($id)
    {
        $model = Student::onlyTrashed()->findOrFail($id);
        $model->forceDelete();
    }

    public function rapor(Request $request, Student $student)
    {
        $data = Report::query()
            ->whereStudentId($student->id)
            ->with(['academic_year', 'classroom', 'student'])
            ->where('published', true)
            ->when($request->academic_year_id, function ($q, $v) {
                $q->where('academic_year_id', $v);
            })
            ->when($request->classroom_id, function ($q, $v) {
                $q->where('classroom_id', $v);
            })
            ->when($request->report_type, function ($q, $v) {
                $q->where('report_type', $v);
            });

        return Inertia::render('student/rapor', [
            'reports' => $data->get(),
            'query' => $request->input(),
            'academicYears' => [AcademicYear::active()],
            'classrooms' => Classroom::whereIn('id', $data->get()->pluck('classroom_id'))->get(),
            'students' => [$student],
            'reportTypes' => Report::$reportTypes,
            'permissions' => [
                'canAdd' => $this->user->can('create report'),
                'canUpdate' => $this->user->can('update report'),
                'canDelete' => $this->user->can('delete report'),
                'canShow' => $this->user->can('show report'),
            ],
            'student' => $student,
        ]);
    }

    public function absent(Request $request, Student $student)
    {
        $data = Absent::query()
            ->with(['student', 'academic_year'])
            ->whereStudentId($student->id)
            ->when($request->academic_year_id, function ($q, $v) {
                $q->where('academic_year_id', $v);
            })
            ->when($request->reason, function ($q, $v) {
                $q->where('reason', $v);
            });

        return Inertia::render('student/absent', [
            'absents' => $data->get(),
            'query' => $request->input(),
            'reasonLists' => Absent::$reasonLists,
            'student' => $student,
            'students' => [$student],
            'academicYears' => AcademicYear::get(),
            'permissions' => [
                'canFilter' => false,
                'canAdd' => $this->user->can('create absent'),
                'canUpdate' => $this->user->can('update absent'),
                'canDelete' => $this->user->can('delete absent'),
                'canShow' => $this->user->can('show absent'),
            ],
        ]);
    }

    public function extracurricular(Request $request, Student $student)
    {
        $data = Activity::query()
            ->with(['academic_year', 'student', 'extracurricular'])
            ->whereStudentId($student->id)
            ->when($request->name, function ($q, $v) {
                $q->where('name', $v);
            });

        return Inertia::render('student/extracurricular', [
            'activities' => $data->get(),
            'query' => $request->input(),
            'students' => [$student],
            'student' => $student,
            'extracurriculars' => Extracurricular::with(['user'])->get(),
            'academicYears' => [AcademicYear::active()->first()],
            'permissions' => [
                'canAdd' => $this->user->can('create activity'),
                'canUpdate' => $this->user->can('update activity'),
                'canDelete' => $this->user->can('delete activity'),
                'canShow' => $this->user->can('show activity'),
            ],
        ]);
    }

    public function nilai(Request $request, Student $student)
    {
        $data = Score::query()
            ->orderBy('lesson_id')
            ->with(['student', 'lesson', 'assignment'])
            ->whereStudentId($student->id)
            ->when($request->name, function ($q, $v) {
                $q->where('name', $v);
            });

        $lessons = Lesson::whereClassroomId($student->classroom_id)->get();

        return Inertia::render('student/nilai', [
            'scores' => $data->get(),
            'query' => $request->input(),
            'students' => [$student],
            'student' => $student,
            'lessons' => $lessons,
            'assignments' => Assignment::whereIn('lesson_id', $lessons->pluck('id'))->get(),
            'permissions' => [
                'canAdd' => false,
                'canUpdate' => $this->user->can('update score'),
                'canDelete' => $this->user->can('delete score'),
                'canShow' => $this->user->can('show score'),
            ],
        ]);
    }

    public function bill(Request $request, Student $student)
    {
        $data = Bill::query()
            ->with(['student', 'payment_type'])
            ->whereStudentId($student->id);

        return Inertia::render('student/bill', [
            'bills' => $data->get(),
            'student' => $student,
            'students' => [$student],
            'statusLists' => Bill::$statusLists,
            'query' => $request->input(),
            'paymentTypes' => PaymentType::get(),
            'permissions' => [
                'canAdd' => $this->user->can('create bill'),
                'canUpdate' => $this->user->can('update bill'),
                'canDelete' => $this->user->can('delete bill'),
                'canShow' => $this->user->can('show bill'),
            ],
        ]);
    }

    public function uploadMedia(UploadStudentMediaRequest $request, Student $student)
    {
        $data = $request->validated();
        $collection = $data['collection_name'];

        $student->addMedia($data['file'])->toMediaCollection($collection);
    }
}
