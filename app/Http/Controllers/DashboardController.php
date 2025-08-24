<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Returns the dashboard page.
     * 
     * @return \Inertia\Response
     */
    public function index()
    {
        return Inertia::render('dashboard/index', [
            'permissions' => [
                
            ]
        ]);
    }

    /**
     * Returns the documentation page with the content of the README.md file.
     * 
     * @return \Inertia\Response
     */
    public function documentation()
    {
        return Inertia::render('documentation', [
            'title' => 'App documentation',
            'content' => file_get_contents(base_path('README.md')),
        ]);
    }
}
