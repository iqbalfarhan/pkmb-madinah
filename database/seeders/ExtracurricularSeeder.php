<?php

namespace Database\Seeders;

use App\Models\Extracurricular;
use Illuminate\Database\Seeder;

class ExtracurricularSeeder extends Seeder
{
    public function run(): void
    {
        $extracurriculars = [
            'Pramuka',
            'Pencak Silat',
            'Futsal',
            'Seni Tari',
            'Drum Band',
        ];

        foreach ($extracurriculars as $extracurricular) {
            Extracurricular::create([
                'name' => $extracurricular,
            ]);
        }
    }
}
