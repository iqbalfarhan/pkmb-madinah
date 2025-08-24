<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AcademicYear;
use Spatie\Permission\Models\Permission;

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

        $permissions = [
            "menu academicyear",
            "index academicyear",
            "show academicyear",
            "create academicyear",
            "update academicyear",
            "delete academicyear",
            //"archived academicyear",
            //"restore academicyear",
            //"force delete academicyear",
        ];

        foreach ($permissions as $permit) {
            Permission::updateOrCreate([
                'group' => "academicyear",
                'name' => $permit,
            ]);
        }
    }
}
