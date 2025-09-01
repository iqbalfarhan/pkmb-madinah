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
    }
}
