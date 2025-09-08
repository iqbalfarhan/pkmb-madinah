<?php

namespace App\Http\Requests;

use App\Models\PaymentType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePaymentTypeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'default_amount' => 'required|numeric',
            'billing_cycle' => [
                'required',
                Rule::in(PaymentType::$defaultCycle),
            ],
        ];
    }
}
