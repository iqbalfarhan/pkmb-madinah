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
                'canOpenPayment' => $this->user->can('index payment') && Payment::where('verified', false)->exists(),
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
            'superadmin' => file_get_contents(base_path('README.md')),
            'admin' => file_get_contents(storage_path('manual/admin.md')),
            'guru' => file_get_contents(storage_path('manual/teacher.md')),
            'walikelas' => file_get_contents(storage_path('manual/walikelas.md')),
            'orangtua' => file_get_contents(storage_path('manual/parent.md')),
        ]);
    }

    public function bills(Request $request)
    {
        $students = Student::where('user_id', auth()->id())->get();
        $data = Bill::query()
            ->with(['student', 'payment_type'])
            ->orderBy('id', 'desc')
            ->whereIn('student_id', $students->pluck('id'))
            ->when($request->student_id, fn ($q, $v) => $q->where('student_id', $v))
            ->when($request->status, fn ($q, $v) => $q->where('status', $v));

        return Inertia::render('bill/index', [
            'bills' => $data->get(),
            'query' => $request->input(),
            'students' => $students,
            'paymentTypes' => PaymentType::get(),
            'statusLists' => Bill::$statusLists,
            'permissions' => [
                'canAdd' => false,
                'canUpdate' => $this->user->can('update bill'),
                'canDelete' => $this->user->can('delete bill'),
                'canShow' => $this->user->can('show bill'),
            ],
        ]);
    }
}
