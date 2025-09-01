<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Absent;
use Spatie\Permission\Models\Permission;

class AbsentSeeder extends Seeder
{
    public function run(): void
    {
        Absent::factory()->count(10)->create();
    }
}
