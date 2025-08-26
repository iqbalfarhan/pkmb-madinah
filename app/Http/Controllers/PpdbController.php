<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePpdbRequest;
use App\Http\Requests\UpdatePpdbRequest;
use App\Models\Family;
use App\Models\Grade;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PpdbController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $data = Student::query()->with(['grade'])->when($request->name, fn($q, $v) => $q->where('name', 'like', "%$v%"));

        return Inertia::render('ppdb/index', [
            'ppdbs' => $data->ppdb()->get(),
            'query' => $request->input(),
            'permissions' => [
                'canAdd' => $this->user->can('create ppdb'),
                'canUpdate' => $this->user->can('update ppdb'),
                'canDelete' => $this->user->can('delete ppdb'),
                'canShow' => $this->user->can('show ppdb'),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function create()
    {
        return Inertia::render('ppdb/create', [
            'grades' => Grade::get()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePpdbRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = auth()->id();

        $student = Student::create($data);
        return redirect(route('ppdb.edit', $student->id));
    }

    /**
     * Display the specified resource.
     */
    public function show(Student $ppdb)
    {
        return Inertia::render('ppdb/show', [
            'ppdb' => $ppdb,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function edit(Student $ppdb)
    {
        return Inertia::render('ppdb/edit', [
            'grades' => Grade::get(),
            'student' => $ppdb,
            'family' => $ppdb->family,
            'salaryLists' => Family::$sallaryLists
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePpdbRequest $request, Student $ppdb)
    {
        $data = $request->validated();
        $ppdb->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $ppdb)
    {
        $ppdb->delete();
    }
}
