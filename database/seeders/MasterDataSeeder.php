<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class MasterDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            PermissionSeeder::class,
            UserSeeder::class,
            AcademicYearSeeder::class,
            GradeSeeder::class,
            SettingSeeder::class,
            ExtracurricularSeeder::class,
            PaymentTypeSeeder::class,
            SubjectSeeder::class,
            AssessmentSeeder::class,
            SettingSeeder::class,
        ]);
    }
}
