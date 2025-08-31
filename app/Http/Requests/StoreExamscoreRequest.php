<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreExamscoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'student_id' => 'required|exists:students,id',
            'exam_id' => 'required|exists:exams,id',
            'score' => 'required|numeric',
            'remark' => 'required|string|max:255',
        ];
    }
}
