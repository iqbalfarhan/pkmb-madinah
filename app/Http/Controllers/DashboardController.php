<?php

namespace App\Http\Controllers;

use App\Models\Bill;
use App\Models\Payment;
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
        $students = Student::whereUserId(auth()->id());
        $bills = Bill::whereIn('student_id', $students->pluck('id'))->get();

        return Inertia::render('dashboard/index', [
            'students' => $students->whereIn('status', ['draft', 'ppdb'])->with('grade', 'user')->get(),
            'bills' => $bills,
            'unverifiedPaymentsCount' => Payment::where('verified', false)->count(),
            'permissions' => [
                'canOpenStudentBill' => $this->user->can('student bill'),
                'canOpenPayment' => $this->user->can('index payment') && Payment::where('verified', false)->exists()
            ],
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
        $students = Student::where('user_id', auth()->id())->get();
        $data = Bill::query()
            ->whereIn('student_id', $students->pluck('id')->toArray())
            ->with(['student', 'payment_type']);

        return Inertia::render('bill/index', [
            'bills' => $data->get(),
            'query' => $request->input(),
            'students' => $students,
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
