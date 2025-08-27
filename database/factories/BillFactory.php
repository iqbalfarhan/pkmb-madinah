<?php

namespace Database\Factories;

use App\Models\Bill;
use App\Models\PaymentType;
use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;

class BillFactory extends Factory
{
    protected $model = Bill::class;

    public function definition(): array
    {
        $status = fake()->randomElement(Bill::$statusLists);
        $paid = $status === 'paid';
        $paidDate = $paid ? now() : null;

        return [
            'student_id' => Student::pluck('id')->random(),
            'payment_type_id' => PaymentType::pluck('id')->random(),
            'paid_date' => $paidDate,
            'description' => fake()->sentence(),
            'total_amount' => fake()->randomFloat(2, 0, 1000),
            'status' => $status,
            'verified' => $paid ? true : fake()->boolean(),
        ];
    }
}
