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

        // buat akun orangtua

        $orangtua = User::updateOrCreate([
            'email' => 'orangtua@gmail.com',
        ], [
            'name' => 'Orang tua wali',
            'password' => 'password',
        ]);

        $orangtua->syncRoles(['orangtua']);

        Student::factory()->count(2)->create([
            'user_id' => $orangtua->id,
            'classroom_id' => null
        ])->each(function($student){
            Family::factory()->create([
                'student_id' => $student->id,
            ]);
            Prevschool::factory()->create([
                'student_id' => $student->id,
            ]);
        });
    }
}
