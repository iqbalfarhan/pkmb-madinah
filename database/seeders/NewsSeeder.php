<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\News;
use Spatie\Permission\Models\Permission;

class NewsSeeder extends Seeder
{
    public function run(): void
    {
        News::factory()->count(10)->create();
    }
}
