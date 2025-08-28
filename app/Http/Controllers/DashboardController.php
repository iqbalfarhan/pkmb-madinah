<?php

namespace App\Http\Controllers;

use App\Models\Bill;
use App\Models\PaymentType;
use App\Models\Student;
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
            'permissions' => [],
            'students' => Student::whereUserId(auth()->id())->whereIn('status', ['draft', 'ppdb'])->with('grade', 'user')->get()
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

    public function bills(Request $request)
    {
        $student_ids = auth()->user()->students->pluck('id')->toArray();
        $data = Bill::query()
            ->with(['student', 'payment_type'])
            ->whereIn('student_id', $student_ids)
            ->when($request->student_id, fn($q, $v) => $q->where('student_id', $v));

        return Inertia::render('bill/index', [
            'bills' => $data->get(),
            'query' => $request->input(),
            'students' => Student::whereIn('id', $student_ids)->get(),
            'paymentTypes' => PaymentType::get(),
            'permissions' => [
                'canAdd' => $this->user->can('create bill'),
                'canUpdate' => $this->user->can('update bill'),
                'canDelete' => $this->user->can('delete bill'),
                'canShow' => $this->user->can('show bill'),
            ]
        ]);
    }
}
