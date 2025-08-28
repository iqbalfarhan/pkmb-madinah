<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreScoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'student_id' => 'required|exists:students,id',
            'lesson_id' => 'required|exists:lessons,id',
            'assignment_id' => 'required|exists:assignments,id',
            'score' => 'required|numeric',
            'remark' => 'nullable|string|max:255',
        ];
    }
}
