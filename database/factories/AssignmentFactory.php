<?php

namespace Database\Factories;

use App\Models\Assignment;
use App\Models\Lesson;
use Illuminate\Database\Eloquent\Factories\Factory;

class AssignmentFactory extends Factory
{
    protected $model = Assignment::class;

    public function definition(): array
    {
        return [
            'lesson_id' => Lesson::pluck('id')->random(),
            'name' => fake()->sentence(),
            'description' => fake()->paragraph(),
            'rate' => fake()->numberBetween(0, 100),
        ];
    }
}
