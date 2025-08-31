<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreActivityRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'extracurricular_id' => 'required|numeric',
            'student_id' => 'required|numeric',
            'academic_year_id' => 'required|numeric',
            'description' => 'required|string|max:255',
        ];
    }
}
