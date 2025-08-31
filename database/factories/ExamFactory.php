<?php

namespace Database\Factories;

use App\Models\AcademicYear;
use App\Models\Classroom;
use App\Models\Exam;
use App\Models\Lesson;
use Illuminate\Database\Eloquent\Factories\Factory;

class ExamFactory extends Factory
{
    protected $model = Exam::class;

    public function definition(): array
    {
        return [
            'lesson_id' => Lesson::pluck('id')->random(),
            'name' => fake()->sentence(),
            'description' => fake()->paragraph(),
            'academic_year_id' => AcademicYear::pluck('id')->random(),
            'classroom_id' => Classroom::pluck('id')->random(),
        ];
    }
}
