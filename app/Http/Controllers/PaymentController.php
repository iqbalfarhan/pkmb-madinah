<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePaymentRequest;
use App\Http\Requests\UpdatePaymentRequest;
use App\Http\Requests\BulkUpdatePaymentRequest;
use App\Http\Requests\BulkDeletePaymentRequest;
use App\Models\Payment;
use DB;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $data = Payment::query()
            ->with(['bill', 'media', 'bill.student'])
            ->when($request->name, fn($q, $v) => $q->where('name', 'like', "%$v%"));

        return Inertia::render('payment/index', [
            'payments' => $data->get(),
            'query' => $request->input(),
            'permissions' => [
                'canAdd' => $this->user->can('create payment'),
                'canUpdate' => $this->user->can('update payment'),
                'canDelete' => $this->user->can('delete payment'),
                'canShow' => $this->user->can('show payment'),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePaymentRequest $request)
    {
        DB::transaction(function () use ($request) {
            $data = $request->validated();
            $payment = Payment::create($data);

            if ($request->hasFile('file')) {
                $payment
                    ->addMedia($request->file('file'))
                    ->toMediaCollection('buktibayar');
            }

            $payment->bill->refreshStatus();
        });
    }

    /**
     * Display the specified resource.
     */
    public function show(Payment $payment)
    {
        return Inertia::render('payment/show', [
            'payment' => $payment
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePaymentRequest $request, Payment $payment)
    {
        $data = $request->validated();

        if ($request->hasFile('file') && $data['file']) {
            $payment->addMedia($data['file'])->toMediaCollection('buktibayar');
        }
        $payment->update($data);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payment $payment)
    {
        $bill = $payment->bill;
        $payment->delete();

        if ($bill) {
            $bill->refreshStatus();
        }
    }

    /**
     * BulkUpdate the specified resource from storage.
     */
    public function bulkUpdate(BulkUpdatePaymentRequest $request)
    {
        $data = $request->validated();
        Payment::whereIn('id', $data['payment_ids'])->update($data);
    }

    /**
     * BulkDelete the specified resource from storage.
     */
    public function bulkDelete(BulkDeletePaymentRequest $request)
    {
        $data = $request->validated();
        Payment::whereIn('id', $data['payment_ids'])->delete();
    }

    
}
