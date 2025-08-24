<?php

namespace App\Http\Requests;

use App\Models\PaymentType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePaymentTypeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'billing_cycle' => [
                'nullable',
                Rule::in(PaymentType::$defaultCycle)
            ],
        ];
    }
}
