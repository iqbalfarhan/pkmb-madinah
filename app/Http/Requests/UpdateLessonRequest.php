<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLessonRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'classroom_id' => 'required|numeric',
            'subject_id' => 'required|numeric',
            'teacher_id' => 'required|numeric',
        ];
    }
}
