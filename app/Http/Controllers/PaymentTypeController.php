<?php

namespace App\Http\Controllers;

use App\Http\Requests\BulkDeletePaymentTypeRequest;
use App\Http\Requests\BulkUpdatePaymentTypeRequest;
use App\Http\Requests\StorePaymentTypeRequest;
use App\Http\Requests\UpdatePaymentTypeRequest;
use App\Models\PaymentType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $data = PaymentType::query()->when($request->name, fn ($q, $v) => $q->where('name', 'like', "%$v%"));

        return Inertia::render('paymenttype/index', [
            'paymenttypes' => $data->get(),
            'query' => $request->input(),
            'defaultCycles' => PaymentType::$defaultCycle,
            'permissions' => [
                'canAdd' => $this->user->can('create paymentType'),
                'canUpdate' => $this->user->can('update paymentType'),
                'canDelete' => $this->user->can('delete paymentType'),
                'canShow' => $this->user->can('show paymentType'),
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePaymentTypeRequest $request)
    {
        $data = $request->validated();
        PaymentType::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(PaymentType $paymenttype)
    {
        return Inertia::render('paymenttype/show', [
            'paymenttype' => $paymenttype,
            'defaultCycles' => PaymentType::$defaultCycle,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePaymentTypeRequest $request, PaymentType $paymenttype)
    {
        $data = $request->validated();
        $paymenttype->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PaymentType $paymenttype)
    {
        $paymenttype->delete();
    }

    /**
     * BulkUpdate the specified resource from storage.
     */
    public function bulkUpdate(BulkUpdatePaymentTypeRequest $request)
    {
        $data = $request->validated();
        PaymentType::whereIn('id', $data['paymentType_ids'])->update($data);
    }

    /**
     * BulkDelete the specified resource from storage.
     */
    public function bulkDelete(BulkDeletePaymentTypeRequest $request)
    {
        $data = $request->validated();
        PaymentType::whereIn('id', $data['payment_type_ids'])->delete();
    }
}
