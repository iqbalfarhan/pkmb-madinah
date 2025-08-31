<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePaymentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'bill_id' => 'required|exists:bills,id',
            'amount' => 'required|numeric',
            'remark' => 'nullable|string|max:255',
            'file' => 'required|image'
        ];
    }
}
