<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Prevschool;
use Spatie\Permission\Models\Permission;

class PrevschoolSeeder extends Seeder
{
    public function run(): void
    {
        Prevschool::factory()->count(10)->create();

        $permissions = [
            "menu prevschool",
            "index prevschool",
            "show prevschool",
            "create prevschool",
            "update prevschool",
            "delete prevschool",
            //"archived prevschool",
            //"restore prevschool",
            //"force delete prevschool",
        ];

        foreach ($permissions as $permit) {
            Permission::updateOrCreate([
                'group' => "prevschool",
                'name' => $permit,
            ]);
        }
    }
}
