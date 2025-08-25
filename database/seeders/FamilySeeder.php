<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Family;
use Spatie\Permission\Models\Permission;

class FamilySeeder extends Seeder
{
    public function run(): void
    {
        Family::factory()->count(10)->create();

        $permissions = [
            "menu family",
            "index family",
            "show family",
            "create family",
            "update family",
            "delete family",
            //"archived family",
            //"restore family",
            //"force delete family",
        ];

        foreach ($permissions as $permit) {
            Permission::updateOrCreate([
                'group' => "family",
                'name' => $permit,
            ]);
        }
    }
}
