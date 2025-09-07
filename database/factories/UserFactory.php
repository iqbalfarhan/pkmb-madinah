<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $gender = fake()->randomElement(["male", "female"]);
        $firstName = fake()->firstName($gender);
        $lastName = fake()->lastName($gender);
        $fullname = Str::ucfirst($firstName ." ". $lastName);

        $email = Str::lower($firstName.$lastName."@google.com");

        return [
            'name' => $fullname,
            'email' => $email,
            'phone' => fake()->numerify("+62###########"),
            'gender' => $gender == "male" ? true : false,
            'username' => Str::lower($firstName.$lastName.fake()->numerify('##')),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
