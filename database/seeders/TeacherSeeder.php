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
        // buat akun guru

        User::factory()->create([
            'name' => 'Guru matapelajaran',
            'email' => 'guru@gmail.com',
            'password' => 'password',
        ])->each(function($user){
            $user->syncRoles(['guru']);
            Teacher::factory()->create([
                'user_id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ]);
        });

        // buat akun walikelas

        User::factory()->create([
            'name' => 'Walikelas',
            'email' => 'walikelas@gmail.com',
            'password' => 'password',
        ])->each(function($user){
            $user->syncRoles(['walikelas']);
            Teacher::factory()->create([
                'user_id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ]);
        });
    }
}
