<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAcademicYearRequest;
use App\Http\Requests\UpdateAcademicYearRequest;
use App\Http\Requests\BulkUpdateAcademicYearRequest;
use App\Http\Requests\BulkDeleteAcademicYearRequest;
use App\Models\AcademicYear;
use App\Models\Classroom;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AcademicYearController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $data = AcademicYear::query()
            ->when($request->name, function($q, $v) {
                $q->where('name', 'like', "%$v%");
            })
            ->orderBy('year', 'desc');

        return Inertia::render('academicyear/index', [
            'academicyears' => $data->get(),
            'query' => $request->input(),
            'permissions' => [
                'canAdd' => $this->user->can('create academicyear'),
                'canUpdate' => $this->user->can('update academicyear'),
                'canDelete' => $this->user->can('delete academicyear'),
                'canShow' => $this->user->can('show academicyear'),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAcademicYearRequest $request)
    {
        $data = $request->validated();

        DB::transaction(function () use ($request, $data) {

            $newClassroom = $data['new_classroom'];
            $detachStudents = $data['detach_students'];

            if ($detachStudents) {
                Student::query()->update(['classroom_id' => null]);
            }
    
            $newAcadmicYear = AcademicYear::create($data);

            if ($newClassroom) {
                $academicYear = AcademicYear::active();
                $classrooms = Classroom::whereAcademicYearId($academicYear->id)->get();

                foreach ($classrooms as $classroom) {
                    Classroom::create([
                        'academic_year_id'=> $newAcadmicYear->id,
                        'name' => $classroom->name,
                        'grade_id' => $classroom->grade_id
                    ]);
                }
            }

            $newAcadmicYear->setActive();
        });
    }

    /**
     * Display the specified resource.
     */
    public function show(AcademicYear $academicyear)
    {
        return Inertia::render('academicyear/show', [
            'academicyear' => $academicyear
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAcademicYearRequest $request, AcademicYear $academicyear)
    {
        $data = $request->validated();
        $academicyear->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AcademicYear $academicyear)
    {
        $academicyear->delete();
    }

    /**
     * BulkUpdate the specified resource from storage.
     */
    public function bulkUpdate(BulkUpdateAcademicYearRequest $request)
    {
        $data = $request->validated();
        AcademicYear::whereIn('id', $data['academic-year_ids'])->update($data);
    }

    /**
     * BulkDelete the specified resource from storage.
     */
    public function bulkDelete(BulkDeleteAcademicYearRequest $request)
    {
        $data = $request->validated();
        AcademicYear::whereIn('id', $data['academic-year_ids'])->delete();
    }

    public function setActive(AcademicYear $academicyear)
    {
        $academicyear->setActive();
    }

    
}
