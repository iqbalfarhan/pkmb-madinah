<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Exam;
use Spatie\Permission\Models\Permission;

class ExamSeeder extends Seeder
{
    public function run(): void
    {
        Exam::factory()->count(10)->create();

        $permissions = [
            "menu exam",
            "index exam",
            "show exam",
            "create exam",
            "update exam",
            "delete exam",
            //"archived exam",
            //"restore exam",
            //"force delete exam",
        ];

        foreach ($permissions as $permit) {
            Permission::updateOrCreate([
                'group' => "exam",
                'name' => $permit,
            ]);
        }
    }
}
