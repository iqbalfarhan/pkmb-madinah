<?php

namespace App\Http\Requests;

use App\Rules\AcademicYearFormatRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreAcademicYearRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'year' => ['required', new AcademicYearFormatRule, 'unique:academic_years,year'],
            'semester' => 'required|string|max:255',
            'new_classroom' => 'nullable|boolean',
            'detach_students' => 'nullable|boolean',
            'active' => 'nullable|boolean',
        ];
    }
}
