<?php

namespace App\Http\Requests;

use App\Models\Report;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateReportRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'classroom_id' => 'nullable|exists:classrooms,id',
            'academic_year_id' => 'nullable|exists:academic_years,id',
            'student_id' => 'nullable|exists:students,id',
            'report_type' => [
                'nullable',
                Rule::in(Report::$reportTypes),
            ],
            'data' => 'nullable',
            'published' => 'nullable|boolean',
        ];
    }
}
