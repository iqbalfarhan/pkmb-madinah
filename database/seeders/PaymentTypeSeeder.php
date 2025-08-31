<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PaymentType;
use Spatie\Permission\Models\Permission;

class PaymentTypeSeeder extends Seeder
{
    public function run(): void
    {
        $paymentTypes = [
            [
                "name" => "Spp bulanan",
                "default_amount" => 500000,
                "billing_cycle" => "bulanan",
            ],
            [
                "name" => "Uang pendaftaran",
                "default_amount" => 1000000,
                "billing_cycle" => "sekali",
            ],
            [
                "name" => "Uang masuk",
                "default_amount" => 1000000,
                "billing_cycle" => "sekali",
            ],
            [
                "name" => "Seragam",
                "default_amount" => 2000000,
                "billing_cycle" => "sekali",
            ],
            [
                "name" => "Daftar ulang",
                "default_amount" => 100000,
                "billing_cycle" => "tahunan",
            ],
            [
                "name" => "Uang kegiatan per semester.",
                "default_amount" => 1000000,
                "billing_cycle" => "semester",
            ],
        ];

        PaymentType::insert($paymentTypes);

        $permissions = [
            "menu paymentType",
            "index paymentType",
            "show paymentType",
            "create paymentType",
            "update paymentType",
            "delete paymentType",
            //"archived paymentType",
            //"restore paymentType",
            //"force delete paymentType",
        ];

        foreach ($permissions as $permit) {
            Permission::updateOrCreate([
                'group' => "paymentType",
                'name' => $permit,
            ]);
        }
    }
}
