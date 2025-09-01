<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Payment;
use Spatie\Permission\Models\Permission;

class PaymentSeeder extends Seeder
{
    public function run(): void
    {
        // Payment::factory()->count(10)->create();

        $permissions = [
            "menu payment",
            "index payment",
            "show payment",
            "create payment",
            "update payment",
            "delete payment",
            "approve payment",
            //"archived payment",
            //"restore payment",
            //"force delete payment",
        ];

        foreach ($permissions as $permit) {
            Permission::updateOrCreate([
                'group' => "payment",
                'name' => $permit,
            ]);
        }
    }
}
