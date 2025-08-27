<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBillRequest;
use App\Http\Requests\UpdateBillRequest;
use App\Http\Requests\BulkUpdateBillRequest;
use App\Http\Requests\BulkDeleteBillRequest;
use App\Models\Bill;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BillController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $data = Bill::query()->when($request->name, fn($q, $v) => $q->where('name', 'like', "%$v%"));

        return Inertia::render('bill/index', [
            'bills' => $data->get(),
            'query' => $request->input(),
            'permissions' => [
                'canAdd' => $this->user->can('create bill'),
                'canUpdate' => $this->user->can('update bill'),
                'canDelete' => $this->user->can('delete bill'),
                'canShow' => $this->user->can('show bill'),
            ]
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
        return Inertia::render('bill/show', [
            'bill' => $bill
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
