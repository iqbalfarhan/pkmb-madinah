<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BulkUpdateacademicYearRequest extends FormRequest
{
    /**
     * Determine if the academicYear is authorized to make this request.
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
            'academicYear_ids' => 'required|array',
            'academicYear_ids.*' => 'exists:academic_years,id',
        ];
    }
}
