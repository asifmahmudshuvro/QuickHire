<?php

use App\Http\Controllers\Api\ApplicationController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\JobController;
use Illuminate\Support\Facades\Route;

Route::get('/jobs', [JobController::class, 'index']);
Route::get('/jobs/{job}', [JobController::class, 'show']);

Route::post('/auth/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function (): void {
	Route::get('/auth/me', [AuthController::class, 'me']);
	Route::post('/auth/logout', [AuthController::class, 'logout']);
});


Route::middleware(['auth:sanctum', 'admin'])->group(function (): void {
	Route::post('/jobs', [JobController::class, 'store']);
	Route::delete('/jobs/{job}', [JobController::class, 'destroy']);
});

Route::post('/applications', [ApplicationController::class, 'store']);
