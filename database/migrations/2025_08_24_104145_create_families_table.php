<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('families', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained('students')->cascadeOnDelete();
            $table->string('father_name')->nullable();
            $table->string('father_ocupation')->nullable();
            $table->string('father_address')->nullable();
            $table->string('father_phone')->nullable();
            $table->string('father_sallary')->nullable();
            $table->string('mother_name')->nullable();
            $table->string('mother_ocupation')->nullable();
            $table->string('mother_address')->nullable();
            $table->string('mother_phone')->nullable();
            $table->string('mother_sallary')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('families');
    }
};
