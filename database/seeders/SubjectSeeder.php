<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Subject;
use Spatie\Permission\Models\Permission;

class SubjectSeeder extends Seeder
{
    public function run(): void
    {
        Subject::factory()->count(10)->create();

        $permissions = [
            "menu subject",
            "index subject",
            "show subject",
            "create subject",
            "update subject",
            "delete subject",
            //"archived subject",
            //"restore subject",
            //"force delete subject",
        ];

        foreach ($permissions as $permit) {
            Permission::updateOrCreate([
                'group' => "subject",
                'name' => $permit,
            ]);
        }
    }
}
