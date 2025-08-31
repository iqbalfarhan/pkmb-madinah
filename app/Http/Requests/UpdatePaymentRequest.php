<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePaymentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'amount' => 'nullable|numeric',
            'remark' => 'nullable|string|max:255',
            'file' => 'nullable|image',
            'verified' => 'nullable|boolean',
        ];
    }
}
