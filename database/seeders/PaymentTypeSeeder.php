<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PaymentType;
use Spatie\Permission\Models\Permission;

class PaymentTypeSeeder extends Seeder
{
    public function run(): void
    {
        PaymentType::factory()->count(10)->create();

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
