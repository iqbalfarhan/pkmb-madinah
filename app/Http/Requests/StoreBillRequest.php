<?php

namespace App\Http\Requests;

use App\Models\Bill;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreBillRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'student_id' => 'required|exists:students,id',
            'payment_type_id' => 'required|exists:payment_types,id',
            'description' => 'required|string|max:255',
            'total_amount' => 'nullable|numeric',
        ];
    }
}
