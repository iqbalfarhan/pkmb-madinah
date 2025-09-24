<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Assessment;
use Spatie\Permission\Models\Permission;

class AssessmentSeeder extends Seeder
{
    public function run(): void
    {
        $datas = [
            "doa harian" => [
                [
                    "name" => "Berdo'a Sebelum belajar",
                    "grade_id" => 2,
                    "semester" => "ganjil"
                ],
                [
                    "name" => "Bacaan Dzikir Pagi dan Petang",
                    "grade_id" => 2,
                    "semester" => "ganjil"
                ],
                [
                    "name" => "Do'a Sebelum Tidur",
                    "grade_id" => 2,
                    "semester" => "ganjil"
                ],
                [
                    "name" => "Do'a Bangun Tidur",
                    "grade_id" => 2,
                    "semester" => "ganjil"
                ],
                [
                    "name" => "Do'a Untuk kedua Orang tua",
                    "grade_id" => 2,
                    "semester" => "ganjil"
                ],
                [
                    "name" => "Do'a Kebaikan Dunia dan Akhirat",
                    "grade_id" => 2,
                    "semester" => "genap"
                ],
                [
                    "name" => "Do'a Sebelum Makan",
                    "grade_id" => 2,
                    "semester" => "genap"
                ],
                [
                    "name" => "Do'a Jika Lupa Membaca Do'a Sebelum Makan",
                    "grade_id" => 2,
                    "semester" => "genap"
                ],
                [
                    "name" => "Do'a Setelah Makan",
                    "grade_id" => 2,
                    "semester" => "genap"
                ],
                // kelas 3
                [
                    "name" => "Do'a Masuk Kamar Mandi",
                    "grade_id" => 3,
                    "semester" => "ganjil"
                ],
                [
                    "name" => "Do'a Keluar Kamar Mandi",
                    "grade_id" => 3,
                    "semester" => "ganjil"
                ],
                [
                    "name" => "Do'a Masuk Masjid",
                    "grade_id" => 3,
                    "semester" => "ganjil"
                ],
                [
                    "name" => "Do'a Keluar Masjid",
                    "grade_id" => 3,
                    "semester" => "ganjil"
                ],
                [
                    "name" => "Do'a Memakai Pakaian",
                    "grade_id" => 3,
                    "semester" => "genap"
                ],
                [
                    "name" => "Do'a Melepas Pakaian",
                    "grade_id" => 3,
                    "semester" => "genap"
                ],
                [
                    "name" => "Do'a Ketika Bercermin",
                    "grade_id" => 3,
                    "semester" => "genap"
                ],
                [
                    "name" => "Do'a Menyisir Rambut",
                    "grade_id" => 3,
                    "semester" => "genap"
                ],

                // kelas 4
                [
                    "name" => "Do'a Ketika Bersin",
                    "grade_id" => 4,
                    "semester" => "ganjil"
                ],
                [
                    "name" => "Do'a Masuk Rumah",
                    "grade_id" => 4,
                    "semester" => "ganjil"
                ],
                [
                    "name" => "Do'a Keluar Rumah",
                    "grade_id" => 4,
                    "semester" => "ganjil"
                ],
                [
                    "name" => "Do'a Berbuka Puasa",
                    "grade_id" => 4,
                    "semester" => "ganjil"
                ],
                [
                    "name" => "Do'a Untuk Orang Sakit",
                    "grade_id" => 4,
                    "semester" => "genap"
                ],
                [
                    "name" => "Do'a Ketika Turun Hujan",
                    "grade_id" => 4,
                    "semester" => "genap"
                ],
                [
                    "name" => "Do'a Naik kendaraan",
                    "grade_id" => 4,
                    "semester" => "genap"
                ],
                [
                    "name" => "Do'a Kafaratul Majelis",
                    "grade_id" => 4,
                    "semester" => "genap"
                ],

                //kelas 5
                [
                    "name" => "Do'a Memakai Pakaian Baru",
                    "grade_id" => 5,
                    "semester" => "ganjil"
                ],
                [
                    "name" => "Do'a Mohon Dipelihara dari Siksa Neraka",
                    "grade_id" => 5,
                    "semester" => "ganjil"
                ],
                [
                    "name" => "Do'a Mohon Dicukupi dan Dilindungi",
                    "grade_id" => 5,
                    "semester" => "ganjil"
                ],
                [
                    "name" => "Do'a Diberi Kesehatan dan Dibantu Untuk mengingat Allah",
                    "grade_id" => 5,
                    "semester" => "ganjil"
                ],
                [
                    "name" => "Do'a Apabila Susah Tidur",
                    "grade_id" => 5,
                    "semester" => "genap"
                ],
                [
                    "name" => "Do'a Ketika Terbangun Karena Terkejut",
                    "grade_id" => 5,
                    "semester" => "genap"
                ],
                [
                    "name" => "Do'a Ketika Bermimpi Buruk",
                    "grade_id" => 5,
                    "semester" => "genap"
                ],

                // kelas 6
                [
                    "name" => "Do'a pada surah Ibrahim ayat 40",
                    "grade_id" => 6,
                    "semester" => "ganjil"
                ],
                [
                    "name" => "Do'a yang terdapat pada surah Ali Imran ayat 8",
                    "grade_id" => 6,
                    "semester" => "ganjil"
                ],
                [
                    "name" => "Do'a Diberi Kemudahan",
                    "grade_id" => 6,
                    "semester" => "ganjil"
                ],
                [
                    "name" => "Do'a Ketika Dipuji Orang Lain",
                    "grade_id" => 6,
                    "semester" => "genap"
                ],
                [
                    "name" => "Doa Setelah Belajar",
                    "grade_id" => 6,
                    "semester" => "genap"
                ],
                [
                    "name" => "Doa selamat",
                    "grade_id" => 6,
                    "semester" => "genap"
                ],
            ],
            "hadist" => [
                [
                    "name" => "Hadits tentang Senyum",
                    "grade_id" => 4,
                    "semester" => "ganjil"
                ],
                [
                    "name" => "Hadits tentang Kebersihan",
                    "grade_id" => 4,
                    "semester" => "ganjil"
                ],
                [
                    "name" => "Hadits tentang Larangan Marah",
                    "grade_id" => 4,
                    "semester" => "genap"
                ],
                [
                    "name" => "Hadits tentang Menuntut Ilmu",
                    "grade_id" => 4,
                    "semester" => "genap"
                ],
                [
                    "name" => "Hadits tentang Kasih Sayang",
                    "grade_id" => 5,
                    "semester" => "ganjil"
                ],
                [
                    "name" => "Hadits tentang Berkata Baik atau Diam",
                    "grade_id" => 5,
                    "semester" => "ganjil"
                ],
                [
                    "name" => "Hadits Tangan Di Atas Lebih Baik",
                    "grade_id" => 5,
                    "semester" => "genap"
                ],
                [
                    "name" => "Hadits tentang Mempelajari Al-Qur'an",
                    "grade_id" => 5,
                    "semester" => "genap"
                ],
                [
                    "name" => "Hadits tentang Berinfaq",
                    "grade_id" => 5,
                    "semester" => "ganjil"
                ],
                [
                    "name" => "Hadits tentang Berbakti Kepada Kedua Orang Tua",
                    "grade_id" => 5,
                    "semester" => "ganjil"
                ],
                [
                    "name" => "Hadits tentang Mengajak Kebaikan",
                    "grade_id" => 5,
                    "semester" => "genap"
                ],
            ],
            "gerakan sholat" => [],
            "bacaan sholat" => [],
            "adzan" => [],
            "tata cara wudhu" => [],
        ];

        foreach ($datas as $group => $names) {
            foreach ($names as $name) {
                Assessment::updateOrCreate([
                    "group" => $group,
                    "name" => $name['name'],
                ],[
                    "grade_id" => $name['grade_id'],
                    "semester" => $name['semester'],
                ]);
            }
        }
    }
}
