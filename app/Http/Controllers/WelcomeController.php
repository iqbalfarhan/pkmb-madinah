<?php

namespace App\Http\Controllers;

use App\Models\News;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function index()
    {
        return Inertia::render('welcome/index', [
            'news' => News::with('media')->orderBy('created_at', 'desc')->limit(3)->get(),
        ]);
    }

    public function berita()
    {
        return Inertia::render('welcome/berita', [
            'news' => News::with('media')->orderBy('created_at', 'desc')->get(),
        ]);
    }

    public function baca($slug)
    {
        $news = News::where('slug', $slug)->first();

        return Inertia::render('welcome/baca', [
            'news' => $news->load(['media', 'user']),
        ]);
    }

    public function alur()
    {
        return Inertia::render('welcome/alur');
    }
}
