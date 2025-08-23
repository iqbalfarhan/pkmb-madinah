<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AcademicYear;

class AcademicYearSeeder extends Seeder
{
    public function run(): void
    {
        $years = [
            '2024/2025',
            '2025/2026',
            '2026/2027',
        ];

        foreach ($years as $year) {
            AcademicYear::create([
                'year' => $year,
                'semester' => 'Genap',
                'active' => false,
            ]);

            AcademicYear::create([
                'year' => $year,
                'semester' => 'Ganjil',
                'active' => false,
            ]);
        }

        AcademicYear::latest()->first()->setActive();
    }
}
