<?php

namespace Database\Seeders;

use App\Models\Family;
use App\Models\Prevschool;
use Illuminate\Database\Seeder;
use App\Models\Student;
use Spatie\Permission\Models\Permission;

class StudentSeeder extends Seeder
{
    public function run(): void
    {
        Student::factory()->count(10)->create()->each(function($student){
            Family::factory()->create([
                'student_id' => $student->id,
            ]);
            Prevschool::factory()->create([
                'student_id' => $student->id,
            ]);
        });
    }
}
