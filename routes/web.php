<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AcademicYearController;
use App\Http\Controllers\GradeController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\SubjectController;





Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('documentation', [DashboardController::class, 'documentation'])->name('documentation');

    Route::put('user/bulk', [UserController::class, 'bulkUpdate'])->name('user.bulk.update');
    Route::delete('user/bulk', [UserController::class, 'bulkDelete'])->name('user.bulk.destroy');
    Route::get('user/archived', [UserController::class, 'archived'])->name('user.archived');
    Route::put('user/{user}/restore', [UserController::class, 'restore'])->name('user.restore');
    Route::delete('user/{user}/force-delete', [UserController::class, 'forceDelete'])->name('user.force-delete');
    Route::apiResource('user', UserController::class);

    Route::apiResource('role', RoleController::class);
    Route::apiResource('permission', PermissionController::class);
    Route::apiResource('media', MediaController::class);

    Route::put('academicyear/bulk', [AcademicYearController::class, 'bulkUpdate'])->name('academicyear.bulk.update');
    Route::delete('academicyear/bulk', [AcademicYearController::class, 'bulkDelete'])->name('academicyear.bulk.destroy');
    Route::put('academicyear/{academicyear}/set-active', [AcademicYearController::class, 'setActive'])->name('academicyear.set-active');
    Route::apiResource('academicyear', AcademicYearController::class);
    Route::put('grade/bulk', [GradeController::class, 'bulkUpdate'])->name('grade.bulk.update');
    Route::delete('grade/bulk', [GradeController::class, 'bulkDelete'])->name('grade.bulk.destroy');
    Route::apiResource('grade', GradeController::class);
    Route::put('teacher/bulk', [TeacherController::class, 'bulkUpdate'])->name('teacher.bulk.update');
    Route::delete('teacher/bulk', [TeacherController::class, 'bulkDelete'])->name('teacher.bulk.destroy');
    Route::get('teacher/archived', [TeacherController::class, 'archived'])->name('teacher.archived');
    Route::put('teacher/{teacher}/restore', [TeacherController::class, 'restore'])->name('teacher.restore');
    Route::delete('teacher/{teacher}/force-delete', [TeacherController::class, 'forceDelete'])->name('teacher.force-delete');
    Route::apiResource('teacher', TeacherController::class);
    Route::put('subject/bulk', [SubjectController::class, 'bulkUpdate'])->name('subject.bulk.update');
    Route::delete('subject/bulk', [SubjectController::class, 'bulkDelete'])->name('subject.bulk.destroy');
    Route::apiResource('subject', SubjectController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
