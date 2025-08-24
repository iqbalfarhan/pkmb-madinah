<?php

namespace Database\Factories;

use App\Models\Lesson;
use App\Models\Material;
use Illuminate\Database\Eloquent\Factories\Factory;

class MaterialFactory extends Factory
{
    protected $model = Material::class;

    public function definition(): array
    {
        return [
            'lesson_id' => Lesson::pluck('id')->random(),
            'title' => fake()->sentence(),
            'description' => fake()->paragraph(),
            'url' => fake()->url(),
        ];
    }
}
