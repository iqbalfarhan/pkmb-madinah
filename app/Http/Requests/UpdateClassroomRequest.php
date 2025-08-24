<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateClassroomRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'nullable|string|max:255',
            'teacher_id' => 'nullable|exists:teachers,id',
            'grade_id' => 'nullable|exists:grades,id',
        ];
    }
}
