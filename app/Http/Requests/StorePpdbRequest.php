<?php

namespace App\Http\Requests;

use App\Models\Student;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePpdbRequest extends FormRequest
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
            'grade_id' => 'required|exists:grades,id',
            'name' => 'required|string|max:255',
            'gender' => 'required|boolean',
            'nisn' => 'required|string|max:255',
            'nis' => 'required|string|max:255',
            'pob' => 'required|string|max:255',
            'dob' => 'required|date',
            'status' => [
                'required',
                Rule::in(Student::$statusLists)
            ],
        ];
    }
}
