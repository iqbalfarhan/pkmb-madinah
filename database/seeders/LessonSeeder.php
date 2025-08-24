<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Lesson;
use Spatie\Permission\Models\Permission;

class LessonSeeder extends Seeder
{
    public function run(): void
    {
        Lesson::factory()->count(10)->create();

        $permissions = [
            "menu lesson",
            "index lesson",
            "show lesson",
            "create lesson",
            "update lesson",
            "delete lesson",
            //"archived lesson",
            //"restore lesson",
            //"force delete lesson",
        ];

        foreach ($permissions as $permit) {
            Permission::updateOrCreate([
                'group' => "lesson",
                'name' => $permit,
            ]);
        }
    }
}
