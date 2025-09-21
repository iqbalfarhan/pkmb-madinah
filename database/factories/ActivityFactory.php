<?php

namespace Database\Factories;

use App\Models\AcademicYear;
use App\Models\Activity;
use App\Models\Extracurricular;
use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;

class ActivityFactory extends Factory
{
    protected $model = Activity::class;

    public function definition(): array
    {
        return [
            'extracurricular_id' => Extracurricular::pluck('id')->random(),
            'student_id' => Student::aktif()->pluck('id')->random(),
            'academic_year_id' => AcademicYear::pluck('id')->random(),
            'description' => fake()->sentence(),
        ];
    }
}
