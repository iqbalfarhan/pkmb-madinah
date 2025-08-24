<?php

use App\Http\Controllers\StudentController;

Route::middleware(['auth', 'verified'])->group(function () {
  Route::put('student/bulk', [StudentController::class, 'bulkUpdate'])->name('student.bulk.update');
  Route::delete('student/bulk', [StudentController::class, 'bulkDelete'])->name('student.bulk.destroy');
  Route::get('student/archived', [StudentController::class, 'archived'])->name('student.archived');
  Route::put('student/{student}/restore', [StudentController::class, 'restore'])->name('student.restore');
  Route::delete('student/{student}/force-delete', [StudentController::class, 'forceDelete'])->name('student.force-delete');
  Route::resource('student', StudentController::class);
});