<?php

namespace Database\Factories;

use App\Models\AcademicYear;
use App\Models\Classroom;
use App\Models\Grade;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ClassroomFactory extends Factory
{
    protected $model = Classroom::class;

    public function definition(): array
    {
        $active = AcademicYear::active();

        return [
            'name' => fake()->sentence(),
            'academic_year_id' => $active->id,
            'user_id' => User::role('walikelas')->pluck('id')->random(),
            'grade_id' => Grade::pluck('id')->random(),
        ];
    }
}
