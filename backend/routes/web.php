<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'name' => 'QuickHire API',
        'status' => 'running',
        'jobs_endpoint' => '/api/jobs'
    ]);
});