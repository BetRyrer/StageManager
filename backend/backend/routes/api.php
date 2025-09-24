<?php

// routes/api.php
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['status' => 'ok', 'message' => 'Hello from Laravel API'];
});
