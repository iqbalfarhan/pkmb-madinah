<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            PermissionSeeder::class,
            UserSeeder::class,
            AcademicYearSeeder::class,
            GradeSeeder::class,
            TeacherSeeder::class,
            SubjectSeeder::class,
            NewsSeeder::class,
            ExtracurricularSeeder::class,
            PaymentTypeSeeder::class,
            ClassroomSeeder::class,
            LessonSeeder::class,
            MaterialSeeder::class,
            StudentSeeder::class,
            FamilySeeder::class,
            ReportSeeder::class,
            PrevschoolSeeder::class,
            AbsentSeeder::class,
            BillSeeder::class,
        ]);
    }
}
