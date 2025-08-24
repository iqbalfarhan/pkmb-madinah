<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreExtracurricularRequest;
use App\Http\Requests\UpdateExtracurricularRequest;
use App\Http\Requests\BulkUpdateExtracurricularRequest;
use App\Http\Requests\BulkDeleteExtracurricularRequest;
use App\Models\Extracurricular;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExtracurricularController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $data = Extracurricular::query()->with('teacher')->when($request->name, fn($q, $v) => $q->where('name', 'like', "%$v%"));

        return Inertia::render('extracurricular/index', [
            'extracurriculars' => $data->get(),
            'query' => $request->input(),
            'teachers' => Teacher::get(),
            'permissions' => [
                'canAdd' => $this->user->can('create extracurricular'),
                'canUpdate' => $this->user->can('update extracurricular'),
                'canDelete' => $this->user->can('delete extracurricular'),
                'canShow' => $this->user->can('show extracurricular'),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreExtracurricularRequest $request)
    {
        $data = $request->validated();
        Extracurricular::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Extracurricular $extracurricular)
    {
        return Inertia::render('extracurricular/show', [
            'extracurricular' => $extracurricular
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateExtracurricularRequest $request, Extracurricular $extracurricular)
    {
        $data = $request->validated();
        $extracurricular->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Extracurricular $extracurricular)
    {
        $extracurricular->delete();
    }

    /**
     * BulkUpdate the specified resource from storage.
     */
    public function bulkUpdate(BulkUpdateExtracurricularRequest $request)
    {
        $data = $request->validated();
        Extracurricular::whereIn('id', $data['extracurricular_ids'])->update($data);
    }

    /**
     * BulkDelete the specified resource from storage.
     */
    public function bulkDelete(BulkDeleteExtracurricularRequest $request)
    {
        $data = $request->validated();
        Extracurricular::whereIn('id', $data['extracurricular_ids'])->delete();
    }

    
}
