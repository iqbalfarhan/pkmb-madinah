<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Http\Requests\BulkUpdateStudentRequest;
use App\Http\Requests\BulkDeleteStudentRequest;
use App\Http\Requests\UploadStudentMediaRequest;
use App\Models\AcademicYear;
use App\Models\Classroom;
use App\Models\Family;
use App\Models\Report;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $data = Student::query()->with(['user', 'grade', 'classroom'])->when($request->name, fn($q, $v) => $q->where('name', 'like', "%$v%"));

        return Inertia::render('student/index', [
            'students' => $data->aktif()->get(),
            'query' => $request->input(),
            'users' => User::get(),
            'statusLists' => Student::$statusLists,
            'permissions' => [
                'canAdd' => $this->user->can('create student'),
                'canUpdate' => $this->user->can('update student'),
                'canDelete' => $this->user->can('delete student'),
                'canShow' => $this->user->can('show student'),
            ]
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
            'student' => $student->load(['user', 'grade', 'classroom', 'family', 'prevschool', 'media']),
            'sallaryLists' => Family::$sallaryLists,
            'permissions' => [
                'canUpdate' => $this->user->can('update student'),
            ]
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
            'status' => 'required|in:'.implode(',', Student::$statusLists)
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
        Student::whereIn('id', $data['student_ids'])->update($data);
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
            'status' => 'aktif'
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
            ->when($request->report_type, function($q, $v)  {
                $q->where('report_type', $v);
            });

        return Inertia::render('report/index', [
            'reports' => $data->get(),
            'query' => $request->input(),
            'academicYears' => AcademicYear::get(),
            'classrooms' => Classroom::get(),
            'students' => Student::get(),
            'reportTypes' => Report::$reportTypes,
            'permissions' => [
                'canAdd' => false,
                'canUpdate' => $this->user->can('update report'),
                'canDelete' => $this->user->can('delete report'),
                'canShow' => $this->user->can('show report'),
            ],
            'student' => $student
        ]);
    }

    public function absent(Student $student)
    {
        return Inertia::render('student/absent', [
            'student' => $student
        ]);
    }

    public function extracurricular(Student $student)
    {
        return Inertia::render('student/extracurricular', [
            'student' => $student
        ]);
    }

    public function nilai(Student $student)
    {
        return Inertia::render('student/nilai', [
            'student' => $student
        ]);
    }

    public function bill(Student $student)
    {
        return Inertia::render('student/bill', [
            'student' => $student
        ]);
    }

    public function uploadMedia(UploadStudentMediaRequest $request, Student $student)
    {
        $data = $request->validated();
        $collection = $data['collection_name'];
        
        $student->addMedia($data['file'])->toMediaCollection($collection);
    }
}
