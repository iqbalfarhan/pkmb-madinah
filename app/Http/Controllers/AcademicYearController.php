<?php

namespace App\Http\Controllers;

use App\Http\Requests\BulkDeleteAcademicYearRequest;
use App\Http\Requests\BulkUpdateAcademicYearRequest;
use App\Http\Requests\StoreAcademicYearRequest;
use App\Http\Requests\UpdateAcademicYearRequest;
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
        $this->pass('index academicyear');

        $data = AcademicYear::query()
            ->when($request->name, function ($q, $v) {
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
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAcademicYearRequest $request)
    {
        $data = $request->validated();

        DB::transaction(function () use ($data) {
            $newAcademicYear = AcademicYear::create($data);

            // Clone classroom kalau diminta
            if (! empty($data['new_classroom']) && $data['new_classroom']) {
                $activeAcademicYear = AcademicYear::active();

                if ($activeAcademicYear) {
                    $classrooms = Classroom::where('academic_year_id', $activeAcademicYear->id)->get();

                    foreach ($classrooms as $classroom) {
                        Classroom::create([
                            'academic_year_id' => $newAcademicYear->id,
                            'name' => $classroom->name,
                            'grade_id' => $classroom->grade_id,
                        ]);
                    }
                }
            }

            // Set active cuma kalau diminta
            if (! empty($data['active']) && $data['active']) {
                $newAcademicYear->setActive();
            }

            // Sync student ke classroom baru
            if (! empty($data['sync_student_classroom']) && $data['sync_student_classroom']) {
                $activeAcademicYear = AcademicYear::active();

                if ($activeAcademicYear) {
                    // Ambil semua student, update classroom_id sesuai grade
                    Student::with('grade.classrooms') // eager load biar gak N+1
                        ->get()
                        ->each(function ($student) use ($activeAcademicYear) {
                            $classroom = $student->grade
                                ? $student->grade->classrooms()
                                    ->where('academic_year_id', $activeAcademicYear->id)
                                    ->first()
                                : null;

                            if ($classroom) {
                                $student->update([
                                    'classroom_id' => $classroom->id,
                                ]);
                            }
                        });
                }
            }
        });
    }

    /**
     * Display the specified resource.
     */
    public function show(AcademicYear $academicyear)
    {
        $this->pass('show academicyear');

        return Inertia::render('academicyear/show', [
            'academicyear' => $academicyear,
            'permissions' => [
                // 'canShow' => $this->user->can('show academicyear')
                'canShow' => false
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAcademicYearRequest $request, AcademicYear $academicyear)
    {
        $this->pass('update academicyear');

        $data = $request->validated();
        $academicyear->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AcademicYear $academicyear)
    {
        $this->pass('delete academicyear');

        $academicyear->delete();
    }

    /**
     * BulkUpdate the specified resource from storage.
     */
    public function bulkUpdate(BulkUpdateAcademicYearRequest $request)
    {
        $this->pass('update academicyear');

        $data = $request->validated();
        AcademicYear::whereIn('id', $data['academic-year_ids'])->update($data);
    }

    /**
     * BulkDelete the specified resource from storage.
     */
    public function bulkDelete(BulkDeleteAcademicYearRequest $request)
    {
        $this->pass('delete academicyear');

        $data = $request->validated();
        AcademicYear::whereIn('id', $data['academic-year_ids'])->delete();
    }

    public function setActive(AcademicYear $academicyear)
    {
        $this->pass('update academicyear');

        $academicyear->setActive();
    }
}
