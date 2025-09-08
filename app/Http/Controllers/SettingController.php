<?php

namespace App\Http\Controllers;

use App\Http\Requests\BulkDeleteSettingRequest;
use App\Http\Requests\BulkUpdateSettingRequest;
use App\Http\Requests\StoreSettingRequest;
use App\Http\Requests\UpdateSettingRequest;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $data = Setting::query()->when($request->name, fn ($q, $v) => $q->where('name', 'like', "%$v%"));

        return Inertia::render('setting/index', [
            'settings' => $data->get(),
            'query' => $request->input(),
            'permissions' => [
                'canAdd' => false,
                'canUpdate' => $this->user->can('update setting'),
                'canDelete' => false,
                'canShow' => false,
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSettingRequest $request)
    {
        $data = $request->validated();
        Setting::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Setting $setting)
    {
        return Inertia::render('setting/show', [
            'setting' => $setting,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSettingRequest $request, Setting $setting)
    {
        $data = $request->validated();
        $setting->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Setting $setting)
    {
        $setting->delete();
    }

    /**
     * BulkUpdate the specified resource from storage.
     */
    public function bulkUpdate(BulkUpdateSettingRequest $request)
    {
        $data = $request->validated();
        Setting::whereIn('id', $data['setting_ids'])->update($data);
    }

    /**
     * BulkDelete the specified resource from storage.
     */
    public function bulkDelete(BulkDeleteSettingRequest $request)
    {
        $data = $request->validated();
        Setting::whereIn('id', $data['setting_ids'])->delete();
    }
}
