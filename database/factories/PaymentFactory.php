<?php

namespace Database\Factories;

use App\Models\Bill;
use App\Models\Payment;
use Illuminate\Database\Eloquent\Factories\Factory;

class PaymentFactory extends Factory
{
    protected $model = Payment::class;

    public function definition(): array
    {
        return [
            'bill_id' => Bill::pluck('id')->random(),
            'amount' => fake()->randomNumber(),
            'remark' => fake()->sentence(),
        ];
    }
}
