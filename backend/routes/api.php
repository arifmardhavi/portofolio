<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AboutController;
use App\Http\Controllers\Api\Admin\IntroductionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public routes
Route::get('/about', [AboutController::class, 'index']);

// Admin routes (later add auth middleware)
Route::post('login', [AuthController::class, 'login']);

Route::prefix('admin')->middleware('auth:sanctum')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('me', [AuthController::class, 'me']);
    Route::apiResource('introductions', IntroductionController::class);
    Route::apiResource('careers', CareerController::class);
    Route::apiResource('educations', EducationController::class);
});
