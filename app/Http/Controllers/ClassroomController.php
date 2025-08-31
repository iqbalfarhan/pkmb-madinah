<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreClassroomRequest;
use App\Http\Requests\UpdateClassroomRequest;
use App\Http\Requests\BulkUpdateClassroomRequest;
use App\Http\Requests\BulkDeleteClassroomRequest;
use App\Models\Absent;
use App\Models\AcademicYear;
use App\Models\Activity;
use App\Models\Classroom;
use App\Models\Extracurricular;
use App\Models\Grade;
use App\Models\Lesson;
use App\Models\Report;
use App\Models\Student;
use App\Models\Subject;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClassroomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $data = Classroom::query()->with(['academic_year', 'teacher', 'grade'])->when($request->name, fn($q, $v) => $q->where('name', 'like', "%$v%"));

        return Inertia::render('classroom/index', [
            'classrooms' => $data->get(),
            'query' => $request->input(),
            'teachers' => Teacher::get(),
            'grades' => Grade::get(),
            'permissions' => [
                'canAdd' => $this->user->can('create classroom'),
                'canUpdate' => $this->user->can('update classroom'),
                'canDelete' => $this->user->can('delete classroom'),
                'canShow' => $this->user->can('show classroom'),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreClassroomRequest $request)
    {
        $data = $request->validated();
        $data['academic_year_id'] = AcademicYear::active()->id;
        
        Classroom::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Classroom $classroom)
    {
        return Inertia::render('classroom/show', [
            'classroom' => $classroom->load('grade', 'students', 'students.absents', 'teacher.user', 'lessons', 'academic_year'),
            'tabname' => 'show',
            'permissions' => [
                'canUpdate' => $this->user->can('update classroom'),
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateClassroomRequest $request, Classroom $classroom)
    {
        $data = $request->validated();
        $classroom->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Classroom $classroom)
    {
        $classroom->delete();
    }

    /**
     * BulkUpdate the specified resource from storage.
     */
    public function bulkUpdate(BulkUpdateClassroomRequest $request)
    {
        $data = $request->validated();
        Classroom::whereIn('id', $data['classroom_ids'])->update($data);
    }

    /**
     * BulkDelete the specified resource from storage.
     */
    public function bulkDelete(BulkDeleteClassroomRequest $request)
    {
        $data = $request->validated();
        Classroom::whereIn('id', $data['classroom_ids'])->delete();
    }

    public function students(Classroom $classroom)
    {
        return Inertia::render('classroom/tabs/classroom-students-tab', [
            'classroom' => $classroom,
            'students' => Student::whereClassroomId($classroom->id)->with(['absents'])->aktif()->get(),
            'tabname' => 'students',
            'permissions' => [
                'canAdd' => $this->user->can('create student'),
                'canUpdate' => $this->user->can('update student'),
                'canDelete' => $this->user->can('delete student'),
                'canShow' => $this->user->can('show student'),
            ]
        ]);
    }

    public function lessons(Classroom $classroom)
    {
        return Inertia::render('classroom/tabs/classroom-lessons-tab', [
            'classroom' => $classroom,
            'lessons' => Lesson::whereClassroomId($classroom->id)->get(),
            'teachers' => Teacher::get(),
            'subjects' => Subject::get(),
            'classrooms' => [$classroom],
            'tabname' => 'lessons',
            'permissions' => [
                'canAddLesson' => $this->user->can('create lesson'),
            ]
        ]);
    }

    public function absents(Classroom $classroom)
    {
        return Inertia::render('classroom/tabs/classroom-absents-tab', [
            'classroom' => $classroom,
            'students' => Student::whereClassroomId($classroom->id)->aktif()->get(),
            'absents' => Absent::with(['academic_year', 'student'])->whereHas('student', fn($query) => $query->where('classroom_id', $classroom->id))->get(),
            'tabname' => 'absents',
            'reasonLists' => Absent::$reasonLists,
            'permissions' => [
                'canAdd' => $this->user->can('create absent'),
                'canUpdate' => $this->user->can('update absent'),
                'canDelete' => $this->user->can('delete absent'),
                'canShow' => $this->user->can('show absent'),
            ]
        ]);
    }

    public function rapors(Classroom $classroom)
    {
        return Inertia::render('classroom/tabs/classroom-rapors-tab', [
            'classroom' => $classroom,
            'rapors' => Student::whereClassroomId($classroom->id)->aktif(),
            'tabname' => 'rapors',
            'reportTypes' => Report::$reportTypes,
            'students' => $classroom->students,
            'academicYears' => [$classroom->academic_year],
            'classrooms' => [$classroom],
            'reports' => Report::with(['student', 'academic_year'])->whereClassroomId($classroom->id)->get(),
            'permissions' => [
                'canAdd' => $this->user->can('create report'),
                'canUpdate' => $this->user->can('update report'),
                'canDelete' => $this->user->can('delete report'),
            ]
        ]);
    }

    public function extracurricular(Request $request, Classroom $classroom)
    {
        $student_ids = $classroom->students->pluck('id')->toArray();
        $data = Activity::query()
            ->with(['academic_year', 'student', 'extracurricular'])
            ->whereIn('student_id', $student_ids)
            ->when($request->name, function($q, $v)  {
                $q->where('name', $v);
            });

        return Inertia::render('classroom/tabs/classroom-extracurricular-tab', [
            'activities' => $data->get(),
            'query' => $request->input(),
            'tabname' => 'extracurricular',
            'classroom' => $classroom,
            'students' => $classroom->students,
            'extracurriculars' => Extracurricular::get(),
            'academicYears' => [AcademicYear::active()->first()],
            'permissions' => [
                'canAdd' => $this->user->can('create activity'),
                'canUpdate' => $this->user->can('update activity'),
                'canDelete' => $this->user->can('delete activity'),
                'canShow' => $this->user->can('show activity'),
            ]
        ]);
    }

    
}
