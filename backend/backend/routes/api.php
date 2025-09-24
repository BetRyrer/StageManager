<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EtudiantController;
use App\Http\Controllers\EntrepriseController;
use App\Http\Controllers\TuteurController;
use App\Http\Controllers\StageController;

// Routes API REST
Route::apiResource('etudiants', EtudiantController::class);
Route::apiResource('entreprises', EntrepriseController::class);
Route::apiResource('tuteurs', TuteurController::class);
Route::apiResource('stages', StageController::class);
Route::get('/ping', fn() => ['pong']);



