<?php

namespace App\Http\Controllers;

use App\Http\Requests\BulkDeleteFamilyRequest;
use App\Http\Requests\BulkUpdateFamilyRequest;
use App\Http\Requests\StoreFamilyRequest;
use App\Http\Requests\UpdateFamilyRequest;
use App\Models\Family;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FamilyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $data = Family::query()->when($request->name, fn ($q, $v) => $q->where('name', 'like', "%$v%"));

        return Inertia::render('family/index', [
            'families' => $data->get(),
            'query' => $request->input(),
            'permissions' => [
                'canAdd' => $this->user->can('create family'),
                'canUpdate' => $this->user->can('update family'),
                'canDelete' => $this->user->can('delete family'),
                'canShow' => $this->user->can('show family'),
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFamilyRequest $request)
    {
        $data = $request->validated();
        Family::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Family $family)
    {
        return Inertia::render('family/show', [
            'family' => $family,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFamilyRequest $request, Family $family)
    {
        $data = $request->validated();
        $family->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Family $family)
    {
        $family->delete();
    }

    /**
     * BulkUpdate the specified resource from storage.
     */
    public function bulkUpdate(BulkUpdateFamilyRequest $request)
    {
        $data = $request->validated();
        Family::whereIn('id', $data['family_ids'])->update($data);
    }

    /**
     * BulkDelete the specified resource from storage.
     */
    public function bulkDelete(BulkDeleteFamilyRequest $request)
    {
        $data = $request->validated();
        Family::whereIn('id', $data['family_ids'])->delete();
    }
}
