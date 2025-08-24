<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Extracurricular;
use Spatie\Permission\Models\Permission;

class ExtracurricularSeeder extends Seeder
{
    public function run(): void
    {
        Extracurricular::factory()->count(10)->create();

        $permissions = [
            "menu extracurricular",
            "index extracurricular",
            "show extracurricular",
            "create extracurricular",
            "update extracurricular",
            "delete extracurricular",
            //"archived extracurricular",
            //"restore extracurricular",
            //"force delete extracurricular",
        ];

        foreach ($permissions as $permit) {
            Permission::updateOrCreate([
                'group' => "extracurricular",
                'name' => $permit,
            ]);
        }
    }
}
