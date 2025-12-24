<?php

use App\Http\Controllers\AbsentController;
use App\Http\Controllers\BillController;
use App\Http\Controllers\FamilyController;
use App\Http\Controllers\PpdbController;
use App\Http\Controllers\PrevschoolController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\StudentController;
use App\Http\Middleware\PpdbMiddleware;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('student/{student}/rapor', [StudentController::class, 'rapor'])->name('student.rapor');
    Route::get('student/{student}/absent', [StudentController::class, 'absent'])->name('student.absent');
    Route::get('student/{student}/extracurricular', [StudentController::class, 'extracurricular'])->name('student.extracurricular');
    Route::get('student/{student}/nilai', [StudentController::class, 'nilai'])->name('student.nilai');
    Route::get('student/{student}/bill', [StudentController::class, 'bill'])->name('student.bill');

    Route::post('student/{student}/upload-media', [StudentController::class, 'uploadMedia'])->name('student.upload-media');
    
    // Classroom assignment routes
    Route::post('student/{student}/assign-classroom', [StudentController::class, 'assignToClassroom'])->name('student.assign-classroom');
    Route::delete('student/{student}/remove-classroom', [StudentController::class, 'removeFromClassroom'])->name('student.remove-classroom');
    Route::get('student/{student}/classrooms', [StudentController::class, 'getClassrooms'])->name('student.classrooms');
    Route::post('student/bulk-assign-classroom', [StudentController::class, 'bulkAssignToClassroom'])->name('student.bulk-assign-classroom');

    Route::put('student/bulk', [StudentController::class, 'bulkUpdate'])->name('student.bulk.update');
    Route::delete('student/bulk', [StudentController::class, 'bulkDelete'])->name('student.bulk.destroy');
    Route::get('student/archived', [StudentController::class, 'archived'])->name('student.archived');
    Route::put('student/{student}/restore', [StudentController::class, 'restore'])->name('student.restore');
    Route::delete('student/{student}/force-delete', [StudentController::class, 'forceDelete'])->name('student.force-delete');

    Route::resource('student', StudentController::class);

    Route::get('report/{report}/download/{type?}', [ReportController::class, 'download'])->where('type', 'stream|download')->name('report.download');
    Route::get('report/{report}/raw', [ReportController::class, 'raw'])->name('report.raw');
    Route::put('report/{report}/refres-nilai', [ReportController::class, 'refreshNilai'])->name('report.refresh-nilai');
    Route::put('report/bulk', [ReportController::class, 'bulkUpdate'])->name('report.bulk.update');
    Route::delete('report/bulk', [ReportController::class, 'bulkDelete'])->name('report.bulk.destroy');
    Route::resource('report', ReportController::class);

    Route::put('absent/bulk', [AbsentController::class, 'bulkUpdate'])->name('absent.bulk.update');
    Route::delete('absent/bulk', [AbsentController::class, 'bulkDelete'])->name('absent.bulk.destroy');
    Route::apiResource('absent', AbsentController::class);

    Route::get('ppdb/{ppdb}/download', [PpdbController::class, 'download'])->name('ppdb.download');
    Route::middleware(PpdbMiddleware::class)->resource('ppdb', PpdbController::class);

    Route::put('family/bulk', [FamilyController::class, 'bulkUpdate'])->name('family.bulk.update');
    Route::delete('family/bulk', [FamilyController::class, 'bulkDelete'])->name('family.bulk.destroy');
    Route::apiResource('family', FamilyController::class);

    Route::put('prevschool/bulk', [PrevschoolController::class, 'bulkUpdate'])->name('prevschool.bulk.update');
    Route::delete('prevschool/bulk', [PrevschoolController::class, 'bulkDelete'])->name('prevschool.bulk.destroy');
    Route::apiResource('prevschool', PrevschoolController::class);

    Route::get('bill/create-bulk', [BillController::class, 'bulkCreate'])->name('bill.bulk.create');
    Route::post('bill/create-bulk', [BillController::class, 'bulkStore'])->name('bill.bulk.store');
    Route::put('bill/bulk', [BillController::class, 'bulkUpdate'])->name('bill.bulk.update');
    Route::delete('bill/bulk', [BillController::class, 'bulkDelete'])->name('bill.bulk.destroy');
    Route::apiResource('bill', BillController::class);
});
