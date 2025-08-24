<?php

namespace App\Http\Controllers;

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
            
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Student $ppdb)
    {
        return Inertia::render('ppdb/show', [
            'ppdb' => $ppdb
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Student $ppdb)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $ppdb)
    {
        //
    }
}
