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
            AcademicYearSeeder::class,
            GradeSeeder::class,
            SettingSeeder::class,
            ExtracurricularSeeder::class,
            PaymentTypeSeeder::class,
            SubjectSeeder::class,

            UserSeeder::class,
            NewsSeeder::class,

            WalikelasSeeder::class,
            ClassroomSeeder::class,

            GuruSeeder::class,
            LessonSeeder::class,
            MaterialSeeder::class,
            AssignmentSeeder::class,
            ExamSeeder::class,

            OrangtuaSeeder::class,
            StudentSeeder::class,
            FamilySeeder::class,
            ReportSeeder::class,
            PrevschoolSeeder::class,
            AbsentSeeder::class,
            BillSeeder::class,
            PaymentSeeder::class,

        ]);
    }
}
