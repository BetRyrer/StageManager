<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EtudiantController;
use App\Http\Controllers\EntrepriseController;
use App\Http\Controllers\TuteurController;
use App\Http\Controllers\StageController;
use App\Http\Controllers\MailLogController;
use App\Http\Controllers\StageMailController;

// Routes API REST
Route::apiResource('etudiants', EtudiantController::class);
Route::apiResource('entreprises', EntrepriseController::class);
Route::apiResource('tuteurs', TuteurController::class);
Route::apiResource('stages', StageController::class);
Route::post('/stages/import', [StageController::class, 'import']);
Route::get('/mail-logs', [MailLogController::class, 'index']);
Route::post('/envoyer-mails', [StageMailController::class, 'envoyerMails']);
Route::get('/mail-logs/{id}', [MailLogController::class, 'show']);
