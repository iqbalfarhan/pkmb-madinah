<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Material;
use Spatie\Permission\Models\Permission;

class MaterialSeeder extends Seeder
{
    public function run(): void
    {
        Material::factory()->count(10)->create();
    }
}
