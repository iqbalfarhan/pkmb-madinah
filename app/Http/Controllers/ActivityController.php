<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreActivityRequest;
use App\Http\Requests\UpdateActivityRequest;
use App\Http\Requests\BulkUpdateActivityRequest;
use App\Http\Requests\BulkDeleteActivityRequest;
use App\Models\AcademicYear;
use App\Models\Activity;
use App\Models\Extracurricular;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ActivityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $data = Activity::query()
            ->with(['academic_year', 'student', 'extracurricular'])
            ->when($request->name, function($q, $v)  {
                $q->where('name', $v);
            });

        return Inertia::render('activity/index', [
            'activities' => $data->get(),
            'query' => $request->input(),
            'students' => Student::get(),
            'extracurriculars' => Extracurricular::get(),
            'academicYears' => AcademicYear::get(),
            'permissions' => [
                'canAdd' => $this->user->can('create activity'),
                'canUpdate' => $this->user->can('update activity'),
                'canDelete' => $this->user->can('delete activity'),
                'canShow' => $this->user->can('show activity'),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreActivityRequest $request)
    {
        $data = $request->validated();
        Activity::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Activity $activity)
    {
        return Inertia::render('activity/show', [
            'activity' => $activity->load('student', 'extracurricular', 'academic_year')
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateActivityRequest $request, Activity $activity)
    {
        $data = $request->validated();
        $activity->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Activity $activity)
    {
        $activity->delete();
    }

    /**
     * BulkUpdate the specified resource from storage.
     */
    public function bulkUpdate(BulkUpdateActivityRequest $request)
    {
        $data = $request->validated();
        Activity::whereIn('id', $data['activity_ids'])->update($data);
    }

    /**
     * BulkDelete the specified resource from storage.
     */
    public function bulkDelete(BulkDeleteActivityRequest $request)
    {
        $data = $request->validated();
        Activity::whereIn('id', $data['activity_ids'])->delete();
    }

    
}
