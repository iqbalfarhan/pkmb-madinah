<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAssignmentRequest;
use App\Http\Requests\UpdateAssignmentRequest;
use App\Http\Requests\BulkUpdateAssignmentRequest;
use App\Http\Requests\BulkDeleteAssignmentRequest;
use App\Models\Assignment;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AssignmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $data = Assignment::query()
        ->with(['lesson']);
        // ->when($request->name, fn($q, $v) => $q->where('name', 'like', "%$v%"));

        return Inertia::render('assignment/index', [
            'assignments' => $data->get(),
            'query' => $request->input(),
            'lessons' => Lesson::get(),
            'permissions' => [
                'canAdd' => $this->user->can('create assignment'),
                'canUpdate' => $this->user->can('update assignment'),
                'canDelete' => $this->user->can('delete assignment'),
                'canShow' => $this->user->can('show assignment'),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAssignmentRequest $request)
    {
        $data = $request->validated();
        Assignment::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Assignment $assignment)
    {
        return Inertia::render('assignment/show', [
            'assignment' => $assignment->load(['scores', 'scores.media'])
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAssignmentRequest $request, Assignment $assignment)
    {
        $data = $request->validated();
        $assignment->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Assignment $assignment)
    {
        $assignment->delete();
    }

    /**
     * BulkUpdate the specified resource from storage.
     */
    public function bulkUpdate(BulkUpdateAssignmentRequest $request)
    {
        $data = $request->validated();
        Assignment::whereIn('id', $data['assignment_ids'])->update($data);
    }

    /**
     * BulkDelete the specified resource from storage.
     */
    public function bulkDelete(BulkDeleteAssignmentRequest $request)
    {
        $data = $request->validated();
        Assignment::whereIn('id', $data['assignment_ids'])->delete();
    }

    
}
