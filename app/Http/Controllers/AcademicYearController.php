<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAcademicYearRequest;
use App\Http\Requests\UpdateAcademicYearRequest;
use App\Http\Requests\BulkUpdateAcademicYearRequest;
use App\Http\Requests\BulkDeleteAcademicYearRequest;
use App\Models\AcademicYear;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AcademicYearController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $data = AcademicYear::query()->when($request->name, fn($q, $v) => $q->where('name', 'like', "%$v%"));

        return Inertia::render('academicyear/index', [
            'academicyears' => $data->get(),
            'query' => $request->input(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAcademicYearRequest $request)
    {
        $data = $request->validated();
        AcademicYear::create($data);
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
