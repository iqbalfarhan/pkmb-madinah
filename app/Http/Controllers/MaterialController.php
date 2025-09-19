<?php

namespace App\Http\Controllers;

use App\Http\Requests\BulkDeleteMaterialRequest;
use App\Http\Requests\BulkUpdateMaterialRequest;
use App\Http\Requests\StoreMaterialRequest;
use App\Http\Requests\UpdateMaterialRequest;
use App\Http\Requests\UploadMaterialMediaRequest;
use App\Models\Classroom;
use App\Models\Lesson;
use App\Models\Material;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MaterialController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $data = Material::query()
            ->with(['lesson'])
            ->when($request->classroom_id, function ($q, $v) {
                $q->whereHas('lesson', function ($lessonQuery) use ($v) {
                    $lessonQuery->where('classroom_id', $v);
                });
            })
            ->when($request->lesson_id, function ($q, $v) {
                $q->where('lesson_id',  $v);
            });

        return Inertia::render('material/index', [
            'materials' => $data->get(),
            'query' => $request->input(),
            'lessons' => Lesson::get(),
            'classrooms' => Classroom::get(),
            'permissions' => [
                'canAdd' => $this->user->can('create material'),
                'canUpdate' => $this->user->can('update material'),
                'canDelete' => $this->user->can('delete material'),
                'canShow' => $this->user->can('show material'),
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMaterialRequest $request)
    {
        $data = $request->validated();
        Material::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Material $material)
    {
        return Inertia::render('material/show', [
            'material' => $material->load('media'),
            'permissions' => [
                'canUpload' => $this->user->can('upload material'),
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMaterialRequest $request, Material $material)
    {
        $data = $request->validated();
        $material->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Material $material)
    {
        $material->delete();
    }

    /**
     * BulkUpdate the specified resource from storage.
     */
    public function bulkUpdate(BulkUpdateMaterialRequest $request)
    {
        $data = $request->validated();
        Material::whereIn('id', $data['material_ids'])->update($data);
    }

    /**
     * BulkDelete the specified resource from storage.
     */
    public function bulkDelete(BulkDeleteMaterialRequest $request)
    {
        $data = $request->validated();
        Material::whereIn('id', $data['material_ids'])->delete();
    }

    public function uploadMedia(UploadMaterialMediaRequest $request, Material $material)
    {
        $data = $request->validated();
        $collection = 'material';

        $material->addMedia($data['file'])->toMediaCollection($collection);
    }
}
