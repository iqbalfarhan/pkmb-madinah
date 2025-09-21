<?php

namespace Database\Factories;

use App\Models\AcademicYear;
use App\Models\Classroom;
use App\Models\Report;
use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReportFactory extends Factory
{
    protected $model = Report::class;

    public function definition(): array
    {
        return [
            'classroom_id' => Classroom::pluck('id')->random(),
            'academic_year_id' => AcademicYear::pluck('id')->random(),
            'student_id' => Student::aktif()->pluck('id')->random(),
            'report_type' => fake()->randomElement(Report::$reportTypes),
            'data' => null,
        ];
    }
}
