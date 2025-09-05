<?php

namespace Database\Seeders;

use App\Models\Family;
use App\Models\Prevschool;
use App\Models\Student;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // buat akun superadmin

        $superadmin = User::updateOrCreate([
            'email' => 'superadmin@gmail.com',
        ], [
            'name' => 'Super administrator',
            'password' => 'password',
        ]);
        $superadmin->assignRole('superadmin');

        // buat akun admin

        $admin = User::updateOrCreate([
            'email' => 'admin@gmail.com',
        ], [
            'name' => 'Administrator',
            'password' => 'password',
        ]);
        $admin->assignRole('admin');
    }
}
