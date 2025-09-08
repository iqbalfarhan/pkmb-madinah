<?php

namespace App\Http\Controllers;

use App\Http\Requests\BulkDeleteNewsRequest;
use App\Http\Requests\BulkUpdateNewsRequest;
use App\Http\Requests\StoreNewsRequest;
use App\Http\Requests\UpdateNewsRequest;
use App\Http\Requests\UploadNewsMediaRequest;
use App\Models\News;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $data = News::query()
            ->with('user')
            ->when($request->user_id, function ($q, $v) {
                $q->where('user_id', $v);
            });

        return Inertia::render('news/index', [
            'news' => $data->get(),
            'query' => $request->input(),
            'users' => User::role('admin')->get(),
            'permissions' => [
                'canAdd' => $this->user->can('create news'),
                'canUpdate' => $this->user->can('update news'),
                'canDelete' => $this->user->can('delete news'),
                'canShow' => $this->user->can('show news'),
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreNewsRequest $request)
    {
        $data = $request->validated();
        $data['slug'] = Str::slug($data['title']);
        $data['user_id'] = auth()->id();

        News::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(News $news)
    {
        return Inertia::render('news/show', [
            'news' => $news->load(['user', 'media']),
        ]);
    }

    /**
     * Edit the specified resource.
     */
    public function edit(News $news)
    {
        return Inertia::render('news/edit', [
            'news' => $news->load(['user', 'media']),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateNewsRequest $request, News $news)
    {
        $data = $request->validated();
        $data['slug'] = Str::slug($data['title']);

        $news->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(News $news)
    {
        $news->delete();
    }

    /**
     * BulkUpdate the specified resource from storage.
     */
    public function bulkUpdate(BulkUpdateNewsRequest $request)
    {
        $data = $request->validated();
        News::whereIn('id', $data['news_ids'])->update($data);
    }

    /**
     * BulkDelete the specified resource from storage.
     */
    public function bulkDelete(BulkDeleteNewsRequest $request)
    {
        $data = $request->validated();
        News::whereIn('id', $data['news_ids'])->delete();
    }

    public function uploadMedia(UploadNewsMediaRequest $request, News $news)
    {
        $data = $request->validated();
        $news->addMedia($data['file'])->toMediaCollection();
    }
}
