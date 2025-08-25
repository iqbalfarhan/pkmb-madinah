<?php

namespace Database\Factories;

use App\Models\Family;
use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;

class FamilyFactory extends Factory
{
    protected $model = Family::class;

    public function definition(): array
    {
        return [
            'student_id' => Student::pluck('id')->random(),
            'father_name' => fake()->name("male"),
            'father_ocupation' => fake()->jobTitle(),
            'father_address' => fake()->address(),
            'father_phone' => fake()->e164PhoneNumber(),
            'father_sallary' => fake()->randomElement(Family::$sallaryLists),
            'mother_name' => fake()->name("female"),
            'mother_ocupation' => fake()->jobTitle(),
            'mother_address' => fake()->address(),
            'mother_phone' => fake()->e164PhoneNumber(),
            'mother_sallary' => fake()->randomElement(Family::$sallaryLists),
        ];
    }
}
