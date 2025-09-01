<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Assignment;
use Spatie\Permission\Models\Permission;

class AssignmentSeeder extends Seeder
{
    public function run(): void
    {
        Assignment::factory()->count(10)->create();
    }
}
