<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreClassroomRequest;
use App\Http\Requests\UpdateClassroomRequest;
use App\Http\Requests\BulkUpdateClassroomRequest;
use App\Http\Requests\BulkDeleteClassroomRequest;
use App\Models\AcademicYear;
use App\Models\Classroom;
use App\Models\Grade;
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
            'classroom' => $classroom
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

    
}
