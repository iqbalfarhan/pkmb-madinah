<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use App\Models\Teacher;
use Spatie\Permission\Models\Permission;

class TeacherSeeder extends Seeder
{
    public function run(): void
    {
        User::factory(3)->create()->each(function (User $user) {
            $user->assignRole('guru');
            Teacher::factory()->create([
                'user_id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ]);
        });

        $permissions = [
            "menu teacher",
            "index teacher",
            "show teacher",
            "create teacher",
            "update teacher",
            "delete teacher",
            "archived teacher",
            "restore teacher",
            "force delete teacher",
        ];

        foreach ($permissions as $permit) {
            Permission::updateOrCreate([
                'group' => "teacher",
                'name' => $permit,
            ]);
        }
    }
}
