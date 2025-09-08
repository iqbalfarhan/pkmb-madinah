<?php

namespace Database\Seeders;

use App\Models\Score;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class ScoreSeeder extends Seeder
{
    public function run(): void
    {
        Score::factory()->count(10)->create();

        $permissions = [
            'menu score',
            'index score',
            'show score',
            'create score',
            'update score',
            'delete score',
            // "archived score",
            // "restore score",
            // "force delete score",
        ];

        foreach ($permissions as $permit) {
            Permission::updateOrCreate([
                'group' => 'score',
                'name' => $permit,
            ]);
        }
    }
}
