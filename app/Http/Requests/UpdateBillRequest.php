<?php

namespace App\Http\Requests;

use App\Models\Bill;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateBillRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'payment_type_id' => 'required|exists:payment_types,id',
            'paid_date' => 'nullable|date',
            'description' => 'nullable|string|max:255',
            'total_amount' => 'nullable|numeric',
            'status' => ['nullable', Rule::in(Bill::$statusLists)],
            'verified' => 'nullable|boolean',
        ];
    }
}
