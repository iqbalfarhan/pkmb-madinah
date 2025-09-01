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
    }
}
