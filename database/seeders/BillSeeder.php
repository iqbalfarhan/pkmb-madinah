<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Bill;
use Spatie\Permission\Models\Permission;

class BillSeeder extends Seeder
{
    public function run(): void
    {
        Bill::factory()->count(10)->create();

        $permissions = [
            "menu bill",
            "student bill",
            "index bill",
            "show bill",
            "create bill",
            "update bill",
            "delete bill",
            //"archived bill",
            //"restore bill",
            //"force delete bill",
        ];

        foreach ($permissions as $permit) {
            Permission::updateOrCreate([
                'group' => "bill",
                'name' => $permit,
            ]);
        }
    }
}
