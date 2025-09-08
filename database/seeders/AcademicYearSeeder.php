<?php

namespace Database\Seeders;

use App\Models\AcademicYear;
use Illuminate\Database\Seeder;

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
        }

        AcademicYear::latest()->first()->setActive();
    }
}
