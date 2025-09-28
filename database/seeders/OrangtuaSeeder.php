<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class OrangtuaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::factory()->create([
            'email' => 'orangtua@gmail.com',
            'username' => 'orangtua',
        ]);

        $user->assignRole('orangtua');

        User::factory()->count(3)->create()->each(function ($user) {
            $user->assignRole('orangtua');
        });
    }
}
