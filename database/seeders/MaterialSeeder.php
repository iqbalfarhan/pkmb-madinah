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

        $permissions = [
            "menu material",
            "index material",
            "show material",
            "create material",
            "update material",
            "delete material",
            "upload material",
            //"archived material",
            //"restore material",
            //"force delete material",
        ];

        foreach ($permissions as $permit) {
            Permission::updateOrCreate([
                'group' => "material",
                'name' => $permit,
            ]);
        }
    }
}
