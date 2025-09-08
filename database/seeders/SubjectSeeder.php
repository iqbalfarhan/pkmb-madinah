<?php

namespace Database\Seeders;

use App\Models\Subject;
use Illuminate\Database\Seeder;

class SubjectSeeder extends Seeder
{
    public function run(): void
    {
        $datas = [
            [
                'group' => 'Pelajaran dasar',
                'name' => 'Pendidikan Agama dan Budi Pekerti',
            ],
            [
                'group' => 'Pelajaran dasar',
                'name' => 'Pendidikan Pancasila dan Kewarganegaraan',
            ],
            [
                'group' => 'Pelajaran dasar',
                'name' => 'Bahasa Indonesia',
            ],
            [
                'group' => 'Pelajaran dasar',
                'name' => 'Matematika',
            ],
            [
                'group' => 'Pelajaran dasar',
                'name' => 'Ilmu Pengetahuan Alam dan Sosial',
            ],
            [
                'group' => 'Pelajaran dasar',
                'name' => 'Seni Budaya dan Prakarya',
            ],
            [
                'group' => 'Pelajaran dasar',
                'name' => 'Pendidikan Jasmani, Olahraga dan Kesehatan',
            ],
            [
                'group' => 'Pelajaran dasar',
                'name' => 'Bahasa Inggris',
            ],
            [
                'group' => 'Muatan lokal',
                'name' => 'Pendidikan Lingkungan Hidup',
            ],
        ];

        Subject::insert($datas);
    }
}
