<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Grade;
use Spatie\Permission\Models\Permission;

class GradeSeeder extends Seeder
{
    public function run(): void
    {
        $grades = [
            [
                "group" => "TK",
                "name" => "TK A",
            ],
            [
                "group" => "TK",
                "name" => "TK B",
            ],
            [
                "group" => "SD",
                "name" => "SD 1",
            ],
            [
                "group" => "SD",
                "name" => "SD 2",
            ],
            [
                "group" => "SD",
                "name" => "SD 3",
            ],
            [
                "group" => "SD",
                "name" => "SD 4",
            ],
            [
                "group" => "SD",
                "name" => "SD 5",
            ],
            [
                "group" => "SD",
                "name" => "SD 6",
            ],
            [
                "group" => "SMP",
                "name" => "SMP 1",
            ],
            [
                "group" => "SMP",
                "name" => "SMP 2",
            ],
            [
                "group" => "SMP",
                "name" => "SMP 3",
            ],
            [
                "group" => "SMA",
                "name" => "SMA 1",
            ],
            [
                "group" => "SMA",
                "name" => "SMA 2",
            ],
            [
                "group" => "SMA",
                "name" => "SMA 3",
            ],
        ];
        Grade::insert($grades);

        $permissions = [
            "menu grade",
            "index grade",
            "show grade",
            "create grade",
            "update grade",
            "delete grade",
            //"archived grade",
            //"restore grade",
            //"force delete grade",
        ];

        foreach ($permissions as $permit) {
            Permission::updateOrCreate([
                'group' => "grade",
                'name' => $permit,
            ]);
        }
    }
}
