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

        $permissions = [
            "menu news",
            "index news",
            "show news",
            "create news",
            "update news",
            "delete news",
            //"archived news",
            //"restore news",
            //"force delete news",
        ];

        foreach ($permissions as $permit) {
            Permission::updateOrCreate([
                'group' => "news",
                'name' => $permit,
            ]);
        }
    }
}
