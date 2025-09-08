<?php

namespace Database\Seeders;

use App\Models\Activity;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class ActivitySeeder extends Seeder
{
    public function run(): void
    {
        Activity::factory()->count(10)->create();

        $permissions = [
            'menu activity',
            'index activity',
            'show activity',
            'create activity',
            'update activity',
            'delete activity',
            // "archived activity",
            // "restore activity",
            // "force delete activity",
        ];

        foreach ($permissions as $permit) {
            Permission::updateOrCreate([
                'group' => 'activity',
                'name' => $permit,
            ]);
        }
    }
}
