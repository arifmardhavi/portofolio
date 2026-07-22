<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AboutController;

Route::get('/about', [AboutController::class, 'index']);

// Nanti tambahkan route admin di bawah yang diproteksi auth:sanctum
