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
                'characters' => ['Kasih Sayang', 'Bersih', 'Jujur', 'Disiplin'],
            ],
            [
                'group' => 'SD',
                'name' => '2 SD',
                'characters' => ['Kasih Sayang', 'Bersih', 'Jujur', 'Disiplin', 'Hormat', 'Rajin'],
            ],
            [
                'group' => 'SD',
                'name' => '3 SD',
                'characters' => ['Tanggung Jawab', "Qana'ah", 'Syukur', 'Taqwa'],
            ],
            [
                'group' => 'SD',
                'name' => '4 SD',
                'characters' => ['Sabar', 'Khusyuk', 'Ikhlas', 'Ramah'],
            ],
            [
                'group' => 'SD',
                'name' => '5 SD',
                'characters' => ['Istiqomah', 'Rendah Hati', 'Berpikir Positif', 'Mutu'],
            ],
            [
                'group' => 'SD',
                'name' => '6 SD',
                'characters' => ['Mutu'],
            ],
        ];

        foreach ($grades as $grade) {
            Grade::updateOrCreate([
                'group' => $grade['group'],
                'name' => $grade['name'],
            ], [
                'characters' => $grade['characters'],
            ]);
        }
    }
}
