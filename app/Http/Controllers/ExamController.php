<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreExamRequest;
use App\Http\Requests\UpdateExamRequest;
use App\Http\Requests\BulkUpdateExamRequest;
use App\Http\Requests\BulkDeleteExamRequest;
use App\Models\AcademicYear;
use App\Models\Classroom;
use App\Models\Exam;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $data = Exam::query()
        ->with(['lesson', 'academic_year', 'classroom'])
        ->when($request->name, fn($q, $v) => $q->where('name', 'like', "%$v%"));

        return Inertia::render('exam/index', [
            'exams' => $data->get(),
            'query' => $request->input(),
            'classrooms' => Classroom::get(),
            'academicYears' => [AcademicYear::active()],
            'lessons' => Lesson::get(),
            'permissions' => [
                'canAdd' => $this->user->can('create exam'),
                'canUpdate' => $this->user->can('update exam'),
                'canDelete' => $this->user->can('delete exam'),
                'canShow' => $this->user->can('show exam'),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreExamRequest $request)
    {
        $data = $request->validated();
        Exam::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Exam $exam)
    {
        return Inertia::render('exam/show', [
            'exam' => $exam->load(['lesson', 'academic_year', 'classroom'])
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateExamRequest $request, Exam $exam)
    {
        $data = $request->validated();
        $exam->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Exam $exam)
    {
        $exam->delete();
    }

    /**
     * BulkUpdate the specified resource from storage.
     */
    public function bulkUpdate(BulkUpdateExamRequest $request)
    {
        $data = $request->validated();
        Exam::whereIn('id', $data['exam_ids'])->update($data);
    }

    /**
     * BulkDelete the specified resource from storage.
     */
    public function bulkDelete(BulkDeleteExamRequest $request)
    {
        $data = $request->validated();
        Exam::whereIn('id', $data['exam_ids'])->delete();
    }

    
}
