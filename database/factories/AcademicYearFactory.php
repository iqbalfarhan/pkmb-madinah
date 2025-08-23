<?php

namespace Database\Factories;

use App\Models\AcademicYear;
use Illuminate\Database\Eloquent\Factories\Factory;

class AcademicYearFactory extends Factory
{
    protected $model = AcademicYear::class;

    public function definition(): array
    {
        return [
            'year' => fake()->sentence(),
            'semester' => fake()->randomElement(["ganjil", "genap"]),
            'active' => fake()->boolean(),
        ];
    }
}
