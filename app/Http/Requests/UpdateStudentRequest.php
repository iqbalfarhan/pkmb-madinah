<?php

namespace App\Http\Requests;

use App\Models\Student;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateStudentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nisn' => 'nullable|string|max:255',
            'nis' => 'nullable|string|max:255',
            'name' => 'nullable|string|max:255',
            'gender' => 'nullable|boolean',
            'status' => [
                'nullable',
                Rule::in(Student::$statusLists),
            ],
            'address' => 'nullable|array',
            'grade_id' => 'nullable|exists:grades,id',
            'classroom_id' => 'nullable|exists:classrooms,id',
            'phone' => 'nullable|string|max:255',
            'email' => 'nullable|email',
            'pob' => 'nullable|string|max:255',
            'dob' => 'nullable',
            'user_id' => 'nullable|exists:users,id',
        ];
    }
}
