<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Report;
use Spatie\Permission\Models\Permission;

class ReportSeeder extends Seeder
{
    public function run(): void
    {
        Report::factory()->count(10)->create();

        $permissions = [
            "menu report",
            "index report",
            "show report",
            "create report",
            "update report",
            "delete report",
            //"archived report",
            //"restore report",
            //"force delete report",
        ];

        foreach ($permissions as $permit) {
            Permission::updateOrCreate([
                'group' => "report",
                'name' => $permit,
            ]);
        }
    }
}
