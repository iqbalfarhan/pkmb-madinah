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
            'year' => ['required', new AcademicYearFormatRule],
            'semester' => 'required|string|max:255',
            'active' => 'nullable|boolean',
        ];
    }
}
