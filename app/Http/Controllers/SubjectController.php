<?php

namespace App\Http\Controllers;

use App\Http\Requests\BulkDeleteSubjectRequest;
use App\Http\Requests\BulkUpdateSubjectRequest;
use App\Http\Requests\StoreSubjectRequest;
use App\Http\Requests\UpdateSubjectRequest;
use App\Http\Requests\UploadSubjectMediaRequest;
use App\Models\Subject;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->user->can('index subject');

        $data = Subject::query()
            ->with(['media'])
            ->when($request->group, function ($q, $v) {
                $q->where('group', $v);
            });

        return Inertia::render('subject/index', [
            'subjects' => $data->get(),
            'query' => $request->input(),
            'defaultGroups' => Subject::$defaultGroups,
            'permissions' => [
                'canAdd' => $this->user->can('create subject'),
                'canUpdate' => $this->user->can('update subject'),
                'canDelete' => $this->user->can('delete subject'),
                'canShow' => $this->user->can('show subject'),
            ],
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function bank(Request $request)
    {
        $this->user->can('bank subject');

        $data = Subject::query()
            ->with(['media'])
            ->when($request->group, function ($q, $v) {
                $q->where('group', $v);
            });

        return Inertia::render('subject/bank', [
            'subjects' => $data->get(),
            'query' => $request->input(),
            'permissions' => [
                'canUpload' => $this->user->can('update subject'),
                'canDelete' => $this->user->can('delete subject'),
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSubjectRequest $request)
    {
        $data = $request->validated();
        Subject::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Subject $subject)
    {
        return Inertia::render('subject/show', [
            'subject' => $subject,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSubjectRequest $request, Subject $subject)
    {
        $data = $request->validated();
        $subject->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Subject $subject)
    {
        $subject->delete();
    }

    /**
     * BulkUpdate the specified resource from storage.
     */
    public function bulkUpdate(BulkUpdateSubjectRequest $request)
    {
        $data = $request->validated();
        Subject::whereIn('id', $data['subject_ids'])->update($data);
    }

    /**
     * BulkDelete the specified resource from storage.
     */
    public function bulkDelete(BulkDeleteSubjectRequest $request)
    {
        $data = $request->validated();
        Subject::whereIn('id', $data['subject_ids'])->delete();
    }

    public function uploadMedia(UploadSubjectMediaRequest $request, Subject $subject)
    {
        $data = $request->validated();

        $subject->addMedia($data['file'])->toMediaCollection();
    }
}
