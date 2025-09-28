<?php

namespace Database\Seeders;

use App\Models\AcademicYear;
use App\Models\Family;
use App\Models\Prevschool;
use App\Models\Student;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PpdbSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $activeYear = AcademicYear::active();
        Student::factory()->count(10)->create([
            'status' => fake()->randomElement(['draft', 'ppdb'])
        ])->each(function ($student) use($activeYear) {
            Family::factory()->create([
                'student_id' => $student->id,
            ]);
            Prevschool::factory()->create([
                'student_id' => $student->id,
            ]);
        });
    }
}
