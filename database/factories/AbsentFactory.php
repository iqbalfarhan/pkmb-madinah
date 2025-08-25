<?php

namespace Database\Factories;

use App\Models\Absent;
use App\Models\AcademicYear;
use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;

class AbsentFactory extends Factory
{
    protected $model = Absent::class;

    public function definition(): array
    {
        return [
            'date' => fake()->date(),
            'student_id' => Student::pluck('id')->random(),
            'academic_year_id' => AcademicYear::pluck('id')->random(),
            'reason' => fake()->randomElement(Absent::$reasonLists),
            'description' => fake()->sentence(),
        ];
    }
}
