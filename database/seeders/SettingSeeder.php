<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            [
                'key' => 'SCHOOL_NAME',
                'hint' => 'Nama sekolah. ini akan ditampilkan diprofile sekolah',
                'value' => 'PKBM AL-MADINAH',
            ],
            [
                'key' => 'SCHOOL_ADDRESS',
                'hint' => 'Alamat sekolah. ini akan ditampilkan diprofile sekolah',
                'value' => 'Jalan Karang Jawa rt. 11 no. 84 Kelurahan Karang Jati Kecamatan Balikpapan Tengah 76123 Kalimantan Timur',
            ],
            [
                'key' => 'SCHOOL_PHONE',
                'hint' => 'Nomor telepon sekolah. ini akan ditampilkan diprofile sekolah',
                'value' => '085553001020',
            ],
            [
                'key' => 'SCHOOL_EMAIL',
                'hint' => 'Email sekolah. ini akan ditampilkan diprofile sekolah',
                'value' => 'pkbmalmadinah2023@gmail.com',
            ],
            [
                'key' => 'SCHOOL_WEBSITE',
                'hint' => 'Website sekolah. ini akan ditampilkan diprofile sekolah',
                'value' => 'https://pkbm-madinah.my.id',
            ],
            [
                'key' => 'SCHOOL_CITY',
                'hint' => 'Kota tempat sekolah berada',
                'value' => 'Balikpapan',
            ],
            [
                'key' => 'PPDB_OPEN',
                'hint' => "Status sesi pendaftaran siswa baru. isi dengan 'true'|'false'.",
                'value' => 'false',
            ],
            [
                'key' => 'KOORDINATOR_Al-MUYASSAR',
                'hint' => 'Nama Koordinator Al-Muyassar (untuk rapor tahfidz)',
                'value' => 'Semi Hidayati, A.Md, S.Pd',
            ],
            [
                'key' => 'PEMBIMBING_TAHFIDZ',
                'hint' => 'Nama pembimbing tahfidz (unruk rapor tahfidz)',
                'value' => 'Wafiqoh Rofa Amaliah',
            ],
            [
                'key' => 'KEPALA_SEKOLAH',
                'hint' => 'Nama kepala sekolah',
                'value' => 'Semi Hidayati, A.Md., S.Pd',
            ],
            [
                'key' => 'PERIODE_GANJIL',
                'hint' => 'Periode bulan untuk semester ganjil',
                'value' => 'Juli - November',
            ],
            [
                'key' => 'PERIODE_GENAP',
                'hint' => 'Periode bulan untuk semester genap',
                'value' => 'Januari - Mei',
            ],
        ];

        foreach ($settings as $setting) {
            Setting::updateOrCreate([
                'key' => $setting['key'],
            ], [
                'hint' => $setting['hint'],
                'value' => $setting['value'],
            ]);
        }
    }
}
