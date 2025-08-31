<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BulkDeletePaymentTypeRequest extends FormRequest
{
    /**
     * Determine if the paymentType is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'payment_type_ids' => 'required|array',
            'payment_type_ids.*' => 'exists:payment_types,id',
        ];
    }
}
