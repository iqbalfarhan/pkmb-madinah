<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Setting;
use Spatie\Permission\Models\Permission;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            [
                "key" => "SCHOOL_NAME",
                "hint" => "Nama sekolah. ini akan ditampilkan diprofile sekolah",
                "value" => "PKBM Al-Madinah"
            ],
            [
                "key" => "SCHOOL_ADDRESS",
                "hint" => "Alamat sekolah. ini akan ditampilkan diprofile sekolah",
                "value" => fake()->address()
            ],
            [
                "key" => "SCHOOL_PHONE",
                "hint" => "Nomor telepon sekolah. ini akan ditampilkan diprofile sekolah",
                "value" => fake()->phoneNumber()
            ],
            [
                "key" => "SCHOOL_EMAIL",
                "hint" => "Email sekolah. ini akan ditampilkan diprofile sekolah",
                "value" => fake()->safeEmail()
            ],
            [
                "key" => "SCHOOL_WEBSITE",
                "hint" => "Website sekolah. ini akan ditampilkan diprofile sekolah",
                "value" => "https://" . fake()->domainName()
            ],
            [
                "key" => "PPDB_OPEN",
                "hint" => "Status sesi pendaftaran siswa baru. isi dengan 'true'|'false'.",
                "value" => "false"
            ],
        ];

        Setting::insert($settings);
    }
}
