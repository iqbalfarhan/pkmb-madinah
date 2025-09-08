<?php

namespace Database\Seeders;

use App\Models\Examscore;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class ExamscoreSeeder extends Seeder
{
    public function run(): void
    {
        Examscore::factory()->count(10)->create();

        $permissions = [
            'menu examscore',
            'index examscore',
            'show examscore',
            'create examscore',
            'update examscore',
            'delete examscore',
            // "archived examscore",
            // "restore examscore",
            // "force delete examscore",
        ];

        foreach ($permissions as $permit) {
            Permission::updateOrCreate([
                'group' => 'examscore',
                'name' => $permit,
            ]);
        }
    }
}
