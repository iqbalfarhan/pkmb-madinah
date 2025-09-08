<?php

use App\Http\Controllers\AcademicYearController;
use App\Http\Controllers\ActivityController;
use App\Http\Controllers\AssignmentController;
use App\Http\Controllers\BillController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\ExamscoreController;
use App\Http\Controllers\ExtracurricularController;
use App\Http\Controllers\FamilyController;
use App\Http\Controllers\GradeController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PaymentTypeController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\PpdbController;
use App\Http\Controllers\PrevschoolController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\ScoreController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WelcomeController;
use App\Http\Middleware\PpdbMiddleware;
use Illuminate\Support\Facades\Route;

Route::get('/', [WelcomeController::class, 'index'])->name('home');
Route::get('/berita', [WelcomeController::class, 'berita'])->name('berita');
Route::get('/baca/{slug}', [WelcomeController::class, 'baca'])->name('baca');
Route::get('/alur', [WelcomeController::class, 'alur'])->name('alur');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('documentation', [DashboardController::class, 'documentation'])->name('documentation');
    Route::get('bills', [DashboardController::class, 'bills'])->name('bills');

    Route::put('user/bulk', [UserController::class, 'bulkUpdate'])->name('user.bulk.update');
    Route::delete('user/bulk', [UserController::class, 'bulkDelete'])->name('user.bulk.destroy');
    Route::get('user/archived', [UserController::class, 'archived'])->name('user.archived');
    Route::put('user/{user}/restore', [UserController::class, 'restore'])->name('user.restore');
    Route::delete('user/{user}/force-delete', [UserController::class, 'forceDelete'])->name('user.force-delete');
    Route::apiResource('user', UserController::class);

    Route::apiResource('role', RoleController::class);
    Route::apiResource('permission', PermissionController::class);
    Route::apiResource('document', MediaController::class);

    Route::put('academicyear/bulk', [AcademicYearController::class, 'bulkUpdate'])->name('academicyear.bulk.update');
    Route::delete('academicyear/bulk', [AcademicYearController::class, 'bulkDelete'])->name('academicyear.bulk.destroy');
    Route::put('academicyear/{academicyear}/set-active', [AcademicYearController::class, 'setActive'])->name('academicyear.set-active');
    Route::apiResource('academicyear', AcademicYearController::class);

    Route::put('grade/bulk', [GradeController::class, 'bulkUpdate'])->name('grade.bulk.update');
    Route::delete('grade/bulk', [GradeController::class, 'bulkDelete'])->name('grade.bulk.destroy');
    Route::apiResource('grade', GradeController::class);

    Route::put('subject/bulk', [SubjectController::class, 'bulkUpdate'])->name('subject.bulk.update');
    Route::delete('subject/bulk', [SubjectController::class, 'bulkDelete'])->name('subject.bulk.destroy');
    Route::apiResource('subject', SubjectController::class);

    Route::post('news/{news}/uploadMedia', [NewsController::class, 'uploadMedia'])->name('news.upload-media');
    Route::put('news/bulk', [NewsController::class, 'bulkUpdate'])->name('news.bulk.update');
    Route::delete('news/bulk', [NewsController::class, 'bulkDelete'])->name('news.bulk.destroy');
    Route::resource('news', NewsController::class);

    Route::put('extracurricular/bulk', [ExtracurricularController::class, 'bulkUpdate'])->name('extracurricular.bulk.update');
    Route::delete('extracurricular/bulk', [ExtracurricularController::class, 'bulkDelete'])->name('extracurricular.bulk.destroy');
    Route::apiResource('extracurricular', ExtracurricularController::class);

    Route::put('paymenttype/bulk', [PaymentTypeController::class, 'bulkUpdate'])->name('paymenttype.bulk.update');
    Route::delete('paymenttype/bulk', [PaymentTypeController::class, 'bulkDelete'])->name('paymenttype.bulk.destroy');
    Route::apiResource('paymenttype', PaymentTypeController::class);

    Route::put('lesson/bulk', [LessonController::class, 'bulkUpdate'])->name('lesson.bulk.update');
    Route::delete('lesson/bulk', [LessonController::class, 'bulkDelete'])->name('lesson.bulk.destroy');
    Route::apiResource('lesson', LessonController::class);

    Route::post('material/{material}/uploadMedia', [MaterialController::class, 'uploadMedia'])->name('material.upload-media');
    Route::put('material/bulk', [MaterialController::class, 'bulkUpdate'])->name('material.bulk.update');
    Route::delete('material/bulk', [MaterialController::class, 'bulkDelete'])->name('material.bulk.destroy');
    Route::apiResource('material', MaterialController::class);

    Route::middleware(PpdbMiddleware::class)->resource('ppdb', PpdbController::class);

    Route::put('family/bulk', [FamilyController::class, 'bulkUpdate'])->name('family.bulk.update');
    Route::delete('family/bulk', [FamilyController::class, 'bulkDelete'])->name('family.bulk.destroy');
    Route::apiResource('family', FamilyController::class);

    Route::put('prevschool/bulk', [PrevschoolController::class, 'bulkUpdate'])->name('prevschool.bulk.update');
    Route::delete('prevschool/bulk', [PrevschoolController::class, 'bulkDelete'])->name('prevschool.bulk.destroy');
    Route::apiResource('prevschool', PrevschoolController::class);
    Route::put('bill/bulk', [BillController::class, 'bulkUpdate'])->name('bill.bulk.update');
    Route::delete('bill/bulk', [BillController::class, 'bulkDelete'])->name('bill.bulk.destroy');
    Route::apiResource('bill', BillController::class);

    Route::put('assignment/bulk', [AssignmentController::class, 'bulkUpdate'])->name('assignment.bulk.update');
    Route::delete('assignment/bulk', [AssignmentController::class, 'bulkDelete'])->name('assignment.bulk.destroy');
    Route::apiResource('assignment', AssignmentController::class);

    Route::put('score/bulk', [ScoreController::class, 'bulkUpdate'])->name('score.bulk.update');
    Route::delete('score/bulk', [ScoreController::class, 'bulkDelete'])->name('score.bulk.destroy');
    Route::apiResource('score', ScoreController::class);

    Route::put('activity/bulk', [ActivityController::class, 'bulkUpdate'])->name('activity.bulk.update');
    Route::delete('activity/bulk', [ActivityController::class, 'bulkDelete'])->name('activity.bulk.destroy');
    Route::apiResource('activity', ActivityController::class);

    Route::put('setting/bulk', [SettingController::class, 'bulkUpdate'])->name('setting.bulk.update');
    Route::delete('setting/bulk', [SettingController::class, 'bulkDelete'])->name('setting.bulk.destroy');
    Route::apiResource('setting', SettingController::class);

    Route::put('payment/bulk', [PaymentController::class, 'bulkUpdate'])->name('payment.bulk.update');
    Route::delete('payment/bulk', [PaymentController::class, 'bulkDelete'])->name('payment.bulk.destroy');
    Route::apiResource('payment', PaymentController::class);

    Route::put('exam/bulk', [ExamController::class, 'bulkUpdate'])->name('exam.bulk.update');
    Route::delete('exam/bulk', [ExamController::class, 'bulkDelete'])->name('exam.bulk.destroy');
    Route::apiResource('exam', ExamController::class);
    Route::put('examscore/bulk', [ExamscoreController::class, 'bulkUpdate'])->name('examscore.bulk.update');
    Route::delete('examscore/bulk', [ExamscoreController::class, 'bulkDelete'])->name('examscore.bulk.destroy');
    Route::apiResource('examscore', ExamscoreController::class);
});

require __DIR__.'/classroom.php';
require __DIR__.'/student.php';
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
