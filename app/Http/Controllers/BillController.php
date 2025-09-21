<?php

namespace App\Http\Controllers;

use App\Http\Requests\BulkDeleteBillRequest;
use App\Http\Requests\BulkUpdateBillRequest;
use App\Http\Requests\StoreBillRequest;
use App\Http\Requests\UpdateBillRequest;
use App\Models\Bill;
use App\Models\PaymentType;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BillController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $data = Bill::query()
            ->with(['student', 'payment_type'])
            ->whereHas('student', function($q){
                $q->where('status', 'aktif');
            })
            ->orderBy('id', 'desc')
            ->when($request->student_id, fn ($q, $v) => $q->where('student_id', $v))
            ->when($request->status, fn ($q, $v) => $q->where('status', $v));

        return Inertia::render('bill/index', [
            'bills' => $data->get(),
            'query' => $request->input(),
            'students' => Student::aktif()->get(),
            'paymentTypes' => PaymentType::get(),
            'statusLists' => Bill::$statusLists,
            'permissions' => [
                'canAdd' => $this->user->can('create bill'),
                'canUpdate' => $this->user->can('update bill'),
                'canDelete' => $this->user->can('delete bill'),
                'canShow' => $this->user->can('show bill'),
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBillRequest $request)
    {
        $data = $request->validated();
        Bill::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Bill $bill)
    {
        $bill->refreshStatus();

        return Inertia::render('bill/show', [
            'bill' => $bill->load('student', 'payment_type', 'payments', 'payments.media'),
            'permissions' => [
                'canAdd' => $this->user->can('create payment'),
                'canUpdate' => $this->user->can('update payment'),
                'canDelete' => $this->user->can('delete payment'),
                'canApprove' => $this->user->can('approve payment'),
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBillRequest $request, Bill $bill)
    {
        $data = $request->validated();
        $bill->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Bill $bill)
    {
        $bill->delete();
    }

    /**
     * BulkUpdate the specified resource from storage.
     */
    public function bulkUpdate(BulkUpdateBillRequest $request)
    {
        $data = $request->validated();
        Bill::whereIn('id', $data['bill_ids'])->update($data);
    }

    /**
     * BulkDelete the specified resource from storage.
     */
    public function bulkDelete(BulkDeleteBillRequest $request)
    {
        $data = $request->validated();
        Bill::whereIn('id', $data['bill_ids'])->delete();
    }
}
