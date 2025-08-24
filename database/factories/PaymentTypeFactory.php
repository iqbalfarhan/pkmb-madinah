<?php

namespace Database\Factories;

use App\Models\PaymentType;
use Illuminate\Database\Eloquent\Factories\Factory;

class PaymentTypeFactory extends Factory
{
    protected $model = PaymentType::class;

    public function definition(): array
    {
        return [
            'name' => fake()->sentence(2),
            'billing_cycle' => fake()->randomElement(PaymentType::$defaultCycle),
        ];
    }
}
