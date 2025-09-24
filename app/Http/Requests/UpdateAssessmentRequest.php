<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAssessmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'group' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'grade_id' => 'nullable|exists:grades,id',
            'semester' => ['nullable', Rule::in(["ganjil", "genap"])]
        ];
    }
}
