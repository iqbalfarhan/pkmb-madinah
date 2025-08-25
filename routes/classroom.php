<?php

use App\Http\Controllers\ClassroomController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('classroom/{classroom}/students', [ClassroomController::class, 'students'])->name('classroom.students');
    Route::get('classroom/{classroom}/lessons', [ClassroomController::class, 'lessons'])->name('classroom.lessons');
    Route::get('classroom/{classroom}/absents', [ClassroomController::class, 'absents'])->name('classroom.absents');
    Route::get('classroom/{classroom}/rapors', [ClassroomController::class, 'rapors'])->name('classroom.rapors');

    Route::put('classroom/bulk', [ClassroomController::class, 'bulkUpdate'])->name('classroom.bulk.update');
    Route::delete('classroom/bulk', [ClassroomController::class, 'bulkDelete'])->name('classroom.bulk.destroy');
    Route::apiResource('classroom', ClassroomController::class);
});