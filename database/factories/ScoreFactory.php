<?php

namespace Database\Factories;

use App\Models\Assignment;
use App\Models\Lesson;
use App\Models\Score;
use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;

class ScoreFactory extends Factory
{
    protected $model = Score::class;

    public function definition(): array
    {
        return [
            'student_id' => Student::aktif()->pluck('id')->random(),
            'lesson_id' => Lesson::pluck('id')->random(),
            'assignment_id' => Assignment::pluck('id')->random(),
            'score' => fake()->randomFloat(2, 0, 100),
            'remark' => fake()->sentence(),
        ];
    }
}
