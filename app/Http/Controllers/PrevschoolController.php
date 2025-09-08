<?php

namespace App\Http\Controllers;

use App\Http\Requests\BulkDeletePrevschoolRequest;
use App\Http\Requests\BulkUpdatePrevschoolRequest;
use App\Http\Requests\StorePrevschoolRequest;
use App\Http\Requests\UpdatePrevschoolRequest;
use App\Models\Prevschool;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PrevschoolController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $data = Prevschool::query()->when($request->name, fn ($q, $v) => $q->where('name', 'like', "%$v%"));

        return Inertia::render('prevschool/index', [
            'prevschools' => $data->get(),
            'query' => $request->input(),
            'permissions' => [
                'canAdd' => $this->user->can('create prevschool'),
                'canUpdate' => $this->user->can('update prevschool'),
                'canDelete' => $this->user->can('delete prevschool'),
                'canShow' => $this->user->can('show prevschool'),
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePrevschoolRequest $request)
    {
        $data = $request->validated();
        Prevschool::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Prevschool $prevschool)
    {
        return Inertia::render('prevschool/show', [
            'prevschool' => $prevschool,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePrevschoolRequest $request, Prevschool $prevschool)
    {
        $data = $request->validated();
        $prevschool->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Prevschool $prevschool)
    {
        $prevschool->delete();
    }

    /**
     * BulkUpdate the specified resource from storage.
     */
    public function bulkUpdate(BulkUpdatePrevschoolRequest $request)
    {
        $data = $request->validated();
        Prevschool::whereIn('id', $data['prevschool_ids'])->update($data);
    }

    /**
     * BulkDelete the specified resource from storage.
     */
    public function bulkDelete(BulkDeletePrevschoolRequest $request)
    {
        $data = $request->validated();
        Prevschool::whereIn('id', $data['prevschool_ids'])->delete();
    }
}
