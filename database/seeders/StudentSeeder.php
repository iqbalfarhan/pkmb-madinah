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

        $permissions = [
            "menu student",
            "index student",
            "show student",
            "create student",
            "update student",
            "delete student",
            "archived student",
            "restore student",
            "force delete student",
        ];

        foreach ($permissions as $permit) {
            Permission::updateOrCreate([
                'group' => "student",
                'name' => $permit,
            ]);
        }
    }
}
