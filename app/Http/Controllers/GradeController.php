<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGradeRequest;
use App\Http\Requests\UpdateGradeRequest;
use App\Http\Requests\BulkUpdateGradeRequest;
use App\Http\Requests\BulkDeleteGradeRequest;
use App\Models\Grade;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GradeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $data = Grade::query()->when($request->group, fn($q, $v) => $q->where('group', $v));

        return Inertia::render('grade/index', [
            'grades' => $data->get(),
            'query' => $request->input(),
            'defaultGroups' => Grade::$defaultGroups,
            'permissions' => [
                'canAdd' => $this->user->can('create grade'),
                'canUpdate' => $this->user->can('update grade'),
                'canDelete' => $this->user->can('delete grade'),
                'canShow' => $this->user->can('show grade'),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGradeRequest $request)
    {
        $data = $request->validated();
        Grade::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Grade $grade)
    {
        return Inertia::render('grade/show', [
            'grade' => $grade
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGradeRequest $request, Grade $grade)
    {
        $data = $request->validated();
        $grade->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Grade $grade)
    {
        $grade->delete();
    }

    /**
     * BulkUpdate the specified resource from storage.
     */
    public function bulkUpdate(BulkUpdateGradeRequest $request)
    {
        $data = $request->validated();
        Grade::whereIn('id', $data['grade_ids'])->update($data);
    }

    /**
     * BulkDelete the specified resource from storage.
     */
    public function bulkDelete(BulkDeleteGradeRequest $request)
    {
        $data = $request->validated();
        Grade::whereIn('id', $data['grade_ids'])->delete();
    }

    
}
