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
                'value' => fake()->address(),
            ],
            [
                'key' => 'SCHOOL_PHONE',
                'hint' => 'Nomor telepon sekolah. ini akan ditampilkan diprofile sekolah',
                'value' => fake()->phoneNumber(),
            ],
            [
                'key' => 'SCHOOL_EMAIL',
                'hint' => 'Email sekolah. ini akan ditampilkan diprofile sekolah',
                'value' => fake()->safeEmail(),
            ],
            [
                'key' => 'SCHOOL_WEBSITE',
                'hint' => 'Website sekolah. ini akan ditampilkan diprofile sekolah',
                'value' => 'https://'.fake()->domainName(),
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
