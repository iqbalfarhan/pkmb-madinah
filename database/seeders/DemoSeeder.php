<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DemoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call([
            NewsSeeder::class,
            WalikelasSeeder::class,
            OrangtuaSeeder::class,
            ClassroomSeeder::class,

            GuruSeeder::class,
            LessonSeeder::class,
            MaterialSeeder::class,
            AssignmentSeeder::class,
            ExamSeeder::class,

            PpdbSeeder::class,
            StudentSeeder::class,
            BillSeeder::class,
            PaymentSeeder::class,
        ]);
    }
}
