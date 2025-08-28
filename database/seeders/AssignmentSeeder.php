<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Assignment;
use Spatie\Permission\Models\Permission;

class AssignmentSeeder extends Seeder
{
    public function run(): void
    {
        Assignment::factory()->count(10)->create();

        $permissions = [
            "menu assignment",
            "index assignment",
            "show assignment",
            "create assignment",
            "update assignment",
            "delete assignment",
            //"archived assignment",
            //"restore assignment",
            //"force delete assignment",
        ];

        foreach ($permissions as $permit) {
            Permission::updateOrCreate([
                'group' => "assignment",
                'name' => $permit,
            ]);
        }
    }
}
