<?php

namespace App\Http\Requests;

use App\Models\Absent;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreAbsentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'date' => 'required|date',
            'student_id' => 'required|exists:students,id',
            'academic_year_id' => 'required|exists:academic_years,id',
            'reason' => [
                'required',
                Rule::in(Absent::$reasonLists)
            ],
            'description' => 'nullable|string|max:255',
        ];
    }
}
