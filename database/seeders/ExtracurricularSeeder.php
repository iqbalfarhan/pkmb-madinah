<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Extracurricular;
use Spatie\Permission\Models\Permission;

class ExtracurricularSeeder extends Seeder
{
    public function run(): void
    {
        $extracurriculars = [
            "Pramuka",
            "Pencak Silat",
            "Futsal",
            "Seni Tari",
            "Drum Band",
        ];

        foreach ($extracurriculars as $extracurricular) {
            Extracurricular::create([
                'name' => $extracurricular,
            ]);
        }
    }
}
