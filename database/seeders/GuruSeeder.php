<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class GuruSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::factory()->create([
            'email' => 'guru@gmail.com',
            'username' => 'guru',
        ]);

        $user->assignRole('guru');

        User::factory()->count(2)->create()->each(function ($user) {
            $user->assignRole('guru');
        });
    }
}
