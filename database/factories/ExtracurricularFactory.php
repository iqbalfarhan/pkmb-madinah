<?php

namespace Database\Factories;

use App\Models\Extracurricular;
use App\Models\Teacher;
use Illuminate\Database\Eloquent\Factories\Factory;

class ExtracurricularFactory extends Factory
{
    protected $model = Extracurricular::class;

    public function definition(): array
    {
        return [
            'name' => fake()->sentence(2),
            'teacher_id' => fake()->randomElement([null, Teacher::pluck('id')->random()]),
        ];
    }
}
