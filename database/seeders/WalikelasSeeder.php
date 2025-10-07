<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class WalikelasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::factory()->create([
            'email' => 'walikelas@gmail.com',
            'username' => 'walikelas',
        ]);

        $user->assignRole('walikelas');

        User::factory(2)->create()->each(function ($user) {
            $user->assignRole('walikelas');
        });
    }
}
