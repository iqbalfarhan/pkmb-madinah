<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BulkUpdateStudentRequest extends FormRequest
{
    /**
     * Determine if the student is authorized to make this request.
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
            'student_ids' => 'required|array',
            'student_ids.*' => 'exists:students,id',
            'classroom_id' => 'nullable|exists:classrooms,id',
        ];
    }
}
