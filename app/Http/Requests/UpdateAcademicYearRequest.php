<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAcademicYearRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'year' => 'nullable|string|max:255',
            'semester' => 'nullable|string|max:255',
            'active' => 'nullable|boolean',
        ];
    }
}
