<?php

namespace App\Http\Requests;

use App\Models\Report;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreReportRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'classroom_id' => 'required|exists:classrooms,id',
            'academic_year_id' => 'required|exists:academic_years,id',
            'semester' => 'nullable|in:genap,ganjil',
            'student_id' => 'required|exists:students,id',
            'report_type' => [
                'required',
                Rule::in(Report::$reportTypes),
            ],
            'data' => 'nullable',
        ];
    }
}
