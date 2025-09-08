<?php

namespace App\Http\Controllers;

use App\Http\Requests\BulkDeleteExamscoreRequest;
use App\Http\Requests\BulkUpdateExamscoreRequest;
use App\Http\Requests\StoreExamscoreRequest;
use App\Http\Requests\UpdateExamscoreRequest;
use App\Models\Examscore;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExamscoreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $data = Examscore::query()->when($request->name, fn ($q, $v) => $q->where('name', 'like', "%$v%"));

        return Inertia::render('examscore/index', [
            'examscores' => $data->get(),
            'query' => $request->input(),
            'permissions' => [
                'canAdd' => $this->user->can('create examscore'),
                'canUpdate' => $this->user->can('update examscore'),
                'canDelete' => $this->user->can('delete examscore'),
                'canShow' => $this->user->can('show examscore'),
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreExamscoreRequest $request)
    {
        $data = $request->validated();
        Examscore::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Examscore $examscore)
    {
        return Inertia::render('examscore/show', [
            'examscore' => $examscore,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateExamscoreRequest $request, Examscore $examscore)
    {
        $data = $request->validated();
        $examscore->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Examscore $examscore)
    {
        $examscore->delete();
    }

    /**
     * BulkUpdate the specified resource from storage.
     */
    public function bulkUpdate(BulkUpdateExamscoreRequest $request)
    {
        $data = $request->validated();
        Examscore::whereIn('id', $data['examscore_ids'])->update($data);
    }

    /**
     * BulkDelete the specified resource from storage.
     */
    public function bulkDelete(BulkDeleteExamscoreRequest $request)
    {
        $data = $request->validated();
        Examscore::whereIn('id', $data['examscore_ids'])->delete();
    }
}
