<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAssessmentRequest;
use App\Http\Requests\UpdateAssessmentRequest;
use App\Http\Requests\BulkUpdateAssessmentRequest;
use App\Http\Requests\BulkDeleteAssessmentRequest;
use App\Models\Assessment;
use App\Models\Grade;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AssessmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $data = Assessment::query()
            ->with(['grade'])
            ->when($request->group, function($q, $v) {
                $q->where('group', $v);
            });

        return Inertia::render('assessment/index', [
            'assessments' => $data->get(),
            'query' => $request->input(),
            'groupLists' => Assessment::$groupLists,
            'grades' => Grade::get(),
            'permissions' => [
                'canAdd' => $this->user->can('create assessment'),
                'canUpdate' => $this->user->can('update assessment'),
                'canDelete' => $this->user->can('delete assessment'),
                'canShow' => $this->user->can('show assessment'),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAssessmentRequest $request)
    {
        $data = $request->validated();
        Assessment::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Assessment $assessment)
    {
        return Inertia::render('assessment/show', [
            'assessment' => $assessment
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAssessmentRequest $request, Assessment $assessment)
    {
        $data = $request->validated();
        $assessment->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Assessment $assessment)
    {
        $assessment->delete();
    }

    /**
     * BulkUpdate the specified resource from storage.
     */
    public function bulkUpdate(BulkUpdateAssessmentRequest $request)
    {
        $data = $request->validated();
        $ids = $data['assessment_ids'];
        unset($data['assessment_ids']);

        Assessment::whereIn('id', $ids)->update($data);
    }

    /**
     * BulkDelete the specified resource from storage.
     */
    public function bulkDelete(BulkDeleteAssessmentRequest $request)
    {
        $data = $request->validated();
        Assessment::whereIn('id', $data['assessment_ids'])->delete();
    }

    
}
