<?php

namespace Database\Factories;

use App\Models\Prevschool;
use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;

class PrevschoolFactory extends Factory
{
    protected $model = Prevschool::class;

    public function definition(): array
    {
        return [
            'student_id' => Student::pluck('id')->random(),
            'name' => fake()->company(),
            'address' => fake()->address(),
        ];
    }
}
