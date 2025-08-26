<?php

use App\Http\Controllers\AbsentController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\StudentController;

Route::middleware(['auth', 'verified'])->group(function () {
	Route::get('student/{student}/rapor', [StudentController::class, 'rapor'])->name('student.rapor');
	Route::get('student/{student}/absent', [StudentController::class, 'absent'])->name('student.absent');
	Route::get('student/{student}/extracurricular', [StudentController::class, 'extracurricular'])->name('student.extracurricular');
	Route::get('student/{student}/nilai', [StudentController::class, 'nilai'])->name('student.nilai');
	Route::get('student/{student}/bill', [StudentController::class, 'bill'])->name('student.bill');

	Route::post('student/{student}/upload-media', [StudentController::class, 'uploadMedia'])->name('student.upload-media');

	Route::put('student/bulk', [StudentController::class, 'bulkUpdate'])->name('student.bulk.update');
	Route::delete('student/bulk', [StudentController::class, 'bulkDelete'])->name('student.bulk.destroy');
	Route::get('student/archived', [StudentController::class, 'archived'])->name('student.archived');
	Route::put('student/{student}/restore', [StudentController::class, 'restore'])->name('student.restore');
	Route::delete('student/{student}/force-delete', [StudentController::class, 'forceDelete'])->name('student.force-delete');

	Route::resource('student', StudentController::class);

	Route::put('report/bulk', [ReportController::class, 'bulkUpdate'])->name('report.bulk.update');
	Route::delete('report/bulk', [ReportController::class, 'bulkDelete'])->name('report.bulk.destroy');
	Route::apiResource('report', ReportController::class);
	
	Route::put('absent/bulk', [AbsentController::class, 'bulkUpdate'])->name('absent.bulk.update');
	Route::delete('absent/bulk', [AbsentController::class, 'bulkDelete'])->name('absent.bulk.destroy');
	Route::apiResource('absent', AbsentController::class);
});