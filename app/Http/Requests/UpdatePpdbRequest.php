<?php

namespace App\Http\Requests;

use App\Models\Student;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePpdbRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
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
            'grade_id' => 'nullable|exists:grades,id',
            'name' => 'nullable|string|max:255',
            'gender' => 'nullable|boolean',
            'nisn' => 'nullable|string|max:255',
            'nis' => 'nullable|string|max:255',
            'pob' => 'nullable|string|max:255',
            'dob' => 'nullable|date',
            'status' => [
                'nullable',
                Rule::in(Student::$statusLists)
            ],
            'address' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:255',
            'email' => 'nullable|email',
        ];
    }
}
