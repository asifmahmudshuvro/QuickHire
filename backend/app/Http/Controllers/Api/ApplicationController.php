<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreApplicationRequest;
use App\Models\Application;
use Illuminate\Http\JsonResponse;

class ApplicationController extends Controller
{
    public function index(): JsonResponse
    {
        $applications = Application::query()
            ->with(['job:id,title,company,location,category'])
            ->latest('id')
            ->get();

        return response()->json([
            'data' => $applications,
        ]);
    }

    public function store(StoreApplicationRequest $request): JsonResponse
    {
        $application = Application::create($request->validated());

        return response()->json([
            'message' => 'Application submitted successfully.',
            'data' => $application,
        ], 201);
    }
}
