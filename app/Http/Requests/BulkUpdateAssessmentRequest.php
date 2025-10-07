<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class BulkUpdateassessmentRequest extends FormRequest
{
    /**
     * Determine if the assessment is authorized to make this request.
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
            'assessment_ids' => 'required|array',
            'assessment_ids.*' => 'exists:assessments,id',
            'group' => 'nullable|string|max:255',
            'grade_id' => 'nullable|exists:grades,id',
            'semester' => ['nullable', Rule::in(['ganjil', 'genap'])],

        ];
    }
}
