<?php

use App\Models\Assessment;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('assessments', function (Blueprint $table) {
            $table->id();
            $table->enum('group', Assessment::$groupLists);
            $table->string('name');
            $table->foreignId('grade_id')->nullable()->constrained('grades')->nullOnDelete();
            $table->enum('semester', ['ganjil', 'genap'])->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('assessments');
    }
};
