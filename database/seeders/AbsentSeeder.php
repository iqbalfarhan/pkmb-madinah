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

        $permissions = [
            "menu absent",
            "index absent",
            "show absent",
            "create absent",
            "update absent",
            "delete absent",
            //"archived absent",
            //"restore absent",
            //"force delete absent",
        ];

        foreach ($permissions as $permit) {
            Permission::updateOrCreate([
                'group' => "absent",
                'name' => $permit,
            ]);
        }
    }
}
