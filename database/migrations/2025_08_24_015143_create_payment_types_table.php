<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payment_types', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->enum('billing_cycle', ['sekali', 'bulanan', 'semester', 'tahunan']);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payment_types');
    }
};
