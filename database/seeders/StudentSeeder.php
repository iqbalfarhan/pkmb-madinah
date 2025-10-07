<?php

namespace Database\Seeders;

use App\Models\Absent;
use App\Models\AcademicYear;
use App\Models\Activity;
use App\Models\Family;
use App\Models\Prevschool;
use App\Models\Student;
use Illuminate\Database\Seeder;

class StudentSeeder extends Seeder
{
    public function run(): void
    {
        $activeYear = AcademicYear::active();
        Student::factory()->count(50)->create([
            'status' => fake()->randomElement(['aktif']),
        ])->each(function ($student) use ($activeYear) {
            Family::factory()->create([
                'student_id' => $student->id,
            ]);
            Prevschool::factory()->create([
                'student_id' => $student->id,
            ]);
            Absent::factory()->create([
                'student_id' => $student->id,
                'academic_year_id' => $activeYear->id,
            ]);
            Activity::factory()->create([
                'student_id' => $student->id,
                'academic_year_id' => $activeYear->id,
            ]);
        });
    }
}
