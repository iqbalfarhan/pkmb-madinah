<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Classroom;
use Spatie\Permission\Models\Permission;

class ClassroomSeeder extends Seeder
{
    public function run(): void
    {
        Classroom::factory()->count(10)->create();

        $permissions = [
            "menu classroom",
            "index classroom",
            "show classroom",
            "create classroom",
            "update classroom",
            "delete classroom",
            //"archived classroom",
            //"restore classroom",
            //"force delete classroom",
        ];

        foreach ($permissions as $permit) {
            Permission::updateOrCreate([
                'group' => "classroom",
                'name' => $permit,
            ]);
        }
    }
}
