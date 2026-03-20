<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EtudiantController;
use App\Http\Controllers\EntrepriseController;
use App\Http\Controllers\TuteurController;
use App\Http\Controllers\StageController;
use App\Http\Controllers\MailLogController;
use App\Http\Controllers\StageMailController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TuteurEcoleController;

// AUTH
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth.token')->get('/me', [AuthController::class, 'me']);

// ROUTES PROTÉGÉES
Route::middleware('auth.token')->group(function () {

    Route::apiResource('etudiants', EtudiantController::class);
    Route::apiResource('entreprises', EntrepriseController::class);
    Route::apiResource('tuteurs', TuteurController::class);
    Route::apiResource('stages', StageController::class);

    Route::post('/stages/import', [StageController::class, 'import']);
    Route::get('/dashboard', [StageController::class, 'dashboard']);

    Route::get('/mail-logs', [MailLogController::class, 'index']);
    Route::post('/envoyer-mails', [StageMailController::class, 'envoyerMails']);
    Route::get('/mail-logs/{id}', [MailLogController::class, 'show']);

        Route::get('/tuteurs-all', [TuteurEcoleController::class, 'index']);

        Route::post(
            '/etudiants/{etudiantId}/tuteurs',
            [TuteurEcoleController::class, 'attachToEtudiant']
        );
});
