<?php

namespace Database\Factories;

use App\Models\Classroom;
use App\Models\Grade;
use App\Models\Student;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class StudentFactory extends Factory
{
    protected $model = Student::class;

    public function definition(): array
    {
        $status = fake()->randomElement(Student::$statusLists);

        $grade_id = Grade::pluck('id')->random();

        return [
            'nisn' => fake()->numerify('###'),
            'nis' => fake()->numerify('###'),
            'name' => fake()->name(),
            'gender' => fake()->boolean(),
            'status' => $status,
            'address' => config('report-mockup.address'),
            'grade_id' => $grade_id,
            'classroom_id' => $status === 'aktif' ? Classroom::whereGradeId($grade_id)->pluck('id')->random() : null,
            'phone' => fake()->e164PhoneNumber(),
            'email' => fake()->email(),
            'pob' => fake()->city(),
            'dob' => fake()->date('Y-m-d', 'now'),
            // 'deleted_at' => in_array($status, ['lulus', 'pindah', 'dikeluarkan']) ? now() : null,
            'user_id' => User::role('orangtua')->pluck('id')->random(),
        ];
    }
}
