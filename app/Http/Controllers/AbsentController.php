<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAbsentRequest;
use App\Http\Requests\UpdateAbsentRequest;
use App\Http\Requests\BulkUpdateAbsentRequest;
use App\Http\Requests\BulkDeleteAbsentRequest;
use App\Models\Absent;
use App\Models\AcademicYear;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AbsentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $data = Absent::query()
            ->with(['student', 'academic_year'])
            ->when($request->student_id, function($q, $v) {
                $q->where('student_id', $v);
            })
            ->when($request->academic_year_id, function($q, $v) {
                $q->where('academic_year_id', $v);
            })
            ->when($request->reason, function($q, $v) {
                $q->where('reason', $v);
            });

        return Inertia::render('absent/index', [
            'absents' => $data->get(),
            'query' => $request->input(),
            'reasonLists' => Absent::$reasonLists,
            'students' => Student::get(),
            'academic_years' => AcademicYear::get(),
            'permissions' => [
                'canAdd' => $this->user->can('create absent'),
                'canUpdate' => $this->user->can('update absent'),
                'canDelete' => $this->user->can('delete absent'),
                'canShow' => $this->user->can('show absent'),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAbsentRequest $request)
    {
        $data = $request->validated();
        $data['academic_year_id'] = AcademicYear::active()->id;
        
        Absent::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Absent $absent)
    {
        return Inertia::render('absent/show', [
            'absent' => $absent
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAbsentRequest $request, Absent $absent)
    {
        $data = $request->validated();
        $absent->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Absent $absent)
    {
        $absent->delete();
    }

    /**
     * BulkUpdate the specified resource from storage.
     */
    public function bulkUpdate(BulkUpdateAbsentRequest $request)
    {
        $data = $request->validated();
        Absent::whereIn('id', $data['absent_ids'])->update($data);
    }

    /**
     * BulkDelete the specified resource from storage.
     */
    public function bulkDelete(BulkDeleteAbsentRequest $request)
    {
        $data = $request->validated();
        Absent::whereIn('id', $data['absent_ids'])->delete();
    }

    
}
