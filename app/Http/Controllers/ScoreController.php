<?php

namespace App\Http\Controllers;

use App\Http\Requests\BulkDeleteScoreRequest;
use App\Http\Requests\BulkUpdateScoreRequest;
use App\Http\Requests\StoreScoreRequest;
use App\Http\Requests\UpdateScoreRequest;
use App\Http\Requests\UploadScoreRequest;
use App\Models\Assignment;
use App\Models\Classroom;
use App\Models\Lesson;
use App\Models\Score;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScoreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $data = Score::query()
            ->with(['student', 'lesson', 'assignment'])
            ->when($request->lesson_id, function ($q, $v) {
                $q->where('lesson_id', $v);
            })
            ->when($request->assignment_id, function ($q, $v) {
                $q->where('assignment_id', $v);
            });

        return Inertia::render('score/index', [
            'scores' => $data->get(),
            'query' => $request->input(),
            'students' => Student::get(),
            'classrooms' => Classroom::get(),
            'lessons' => Lesson::get(),
            'assignments' => Assignment::get(),
            'permissions' => [
                'canAdd' => $this->user->can('create score'),
                'canUpdate' => $this->user->can('update score'),
                'canDelete' => $this->user->can('delete score'),
                'canShow' => $this->user->can('show score'),
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreScoreRequest $request)
    {
        $data = $request->validated();
        Score::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Score $score)
    {
        return Inertia::render('score/show', [
            'score' => $score,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateScoreRequest $request, Score $score)
    {
        $data = $request->validated();
        $score->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Score $score)
    {
        $score->delete();
    }

    /**
     * BulkUpdate the specified resource from storage.
     */
    public function bulkUpdate(BulkUpdateScoreRequest $request)
    {
        $data = $request->validated();
        Score::whereIn('id', $data['score_ids'])->update($data);
    }

    /**
     * BulkDelete the specified resource from storage.
     */
    public function bulkDelete(BulkDeleteScoreRequest $request)
    {
        $data = $request->validated();
        Score::whereIn('id', $data['score_ids'])->delete();
    }

    public function uploadAnswer(UploadScoreRequest $request)
    {
        $data = $request->validated();

        $lesson = Assignment::find($data['assignment_id'])->lesson;
        $data['lesson_id'] = $lesson->id;
        $score = Score::create($data);

        $score->addMedia($data['file'])->toMediaCollection();
    }
}
