<?php

namespace Database\Seeders;

use App\Models\AcademicYear;
use App\Models\Grade;
use App\Models\Teacher;
use Illuminate\Database\Seeder;
use App\Models\Classroom;
use Spatie\Permission\Models\Permission;

class ClassroomSeeder extends Seeder
{
    public function run(): void
    {
        $grades = Grade::get();

        foreach ($grades as $grade) {
            Classroom::create([
                'name' => "Kelas {$grade->name}",
                'academic_year_id' => AcademicYear::active()->id,
                'teacher_id' => Teacher::pluck('id')->random(),
                'grade_id' => $grade->id
            ]);
        }
    }
}
