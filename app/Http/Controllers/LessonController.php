<?php

namespace App\Http\Controllers;

use App\Http\Requests\BulkDeleteLessonRequest;
use App\Http\Requests\BulkUpdateLessonRequest;
use App\Http\Requests\StoreLessonRequest;
use App\Http\Requests\UpdateLessonRequest;
use App\Models\AcademicYear;
use App\Models\Classroom;
use App\Models\Examscore;
use App\Models\Lesson;
use App\Models\Score;
use App\Models\Subject;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LessonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $data = Lesson::query()
            ->with(['classroom', 'subject', 'user'])
            ->when($request->classroom_id, function ($q, $v) {
                $q->where('classroom_id', $v);
            })
            ->when($request->subject_id, function ($q, $v) {
                $q->where('subject_id', $v);
            });

        return Inertia::render('lesson/index', [
            'lessons' => $data->get(),
            'query' => $request->input(),
            'users' => User::role('guru')->get(),
            'subjects' => Subject::get(),
            'classrooms' => Classroom::get(),
            'permissions' => [
                'canAdd' => $this->user->can('create lesson'),
                'canUpdate' => $this->user->can('update lesson'),
                'canDelete' => $this->user->can('delete lesson'),
                'canShow' => $this->user->can('show lesson'),
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLessonRequest $request)
    {
        $data = $request->validated();
        Lesson::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Lesson $lesson)
    {
        $students = $lesson->classroom->students;
        $scores = Score::where('lesson_id', $lesson->id)->whereIn('student_id', $students->pluck('id'))->get();

        return Inertia::render('lesson/show', [
            'lesson' => $lesson->load('materials.media', 'classroom', 'subject', 'user'),
            'assignments' => $lesson->assignments,
            'lessons' => [$lesson],
            'students' => $students,
            'scores' => $scores,
            'exams' => $lesson->exams,
            'examscores' => Examscore::whereIn('exam_id', $lesson->exams->pluck('id'))->get(),
            'classrooms' => [$lesson->classroom],
            'academicYears' => [AcademicYear::active()],
            'permissions' => [
                'canAdd' => $this->user->id === $lesson->user_id && $this->user->can('create assignment'),
                'canUpload' => $this->user->id === $lesson->user_id && $this->user->can('create assignment'),
                'canUpdate' => $this->user->can('update assignment'),
                'canDelete' => $this->user->can('delete assignment'),
                'canShow' => $this->user->can('show assignment'),

                'canUpdateMaterial' => $this->user->can('update material'),
            ],
            'query' => $request->input(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLessonRequest $request, Lesson $lesson)
    {
        $data = $request->validated();
        $lesson->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lesson $lesson)
    {
        $lesson->delete();
    }

    /**
     * BulkUpdate the specified resource from storage.
     */
    public function bulkUpdate(BulkUpdateLessonRequest $request)
    {
        $data = $request->validated();
        Lesson::whereIn('id', $data['lesson_ids'])->update($data);
    }

    /**
     * BulkDelete the specified resource from storage.
     */
    public function bulkDelete(BulkDeleteLessonRequest $request)
    {
        $data = $request->validated();
        Lesson::whereIn('id', $data['lesson_ids'])->delete();
    }
}
