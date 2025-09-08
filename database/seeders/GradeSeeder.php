<?php

namespace Database\Seeders;

use App\Models\Grade;
use Illuminate\Database\Seeder;

class GradeSeeder extends Seeder
{
    public function run(): void
    {
        $grades = [
            [
                'group' => 'SD',
                'name' => '1 SD',
            ],
            [
                'group' => 'SD',
                'name' => '2 SD',
            ],
            [
                'group' => 'SD',
                'name' => '3 SD',
            ],
            [
                'group' => 'SD',
                'name' => '4 SD',
            ],
            [
                'group' => 'SD',
                'name' => '5 SD',
            ],
            [
                'group' => 'SD',
                'name' => '6 SD',
            ],
        ];

        Grade::insert($grades);
    }
}
