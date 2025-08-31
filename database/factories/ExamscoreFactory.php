<?php

namespace Database\Factories;

use App\Models\Exam;
use App\Models\Examscore;
use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;

class ExamscoreFactory extends Factory
{
    protected $model = Examscore::class;

    public function definition(): array
    {
        return [
            'student_id' => Student::pluck('id')->random(),
            'exam_id' => Exam::pluck('id')->random(),
            'score' => fake()->numberBetween(75, 100),
            'remark' => fake()->sentence(),
        ];
    }
}
