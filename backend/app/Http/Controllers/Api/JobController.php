<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreJobRequest;
use App\Models\Job;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class JobController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $jobs = Job::query()
            ->when($request->filled('search'), function ($query) use ($request) {
                $search = (string) $request->string('search');

                $query->where(function ($subQuery) use ($search) {
                    $subQuery
                        ->where('title', 'like', "%{$search}%")
                        ->orWhere('company', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%");
                });
            })
            ->when($request->filled('category'), function ($query) use ($request) {
                $query->where('category', (string) $request->string('category'));
            })
            ->when($request->filled('location'), function ($query) use ($request) {
                $query->where('location', (string) $request->string('location'));
            })
            ->latest()
            ->get();

        return response()->json([
            'data' => $jobs,
        ]);
    }

    public function show(Job $job): JsonResponse
    {
        return response()->json([
            'data' => $job,
        ]);
    }

    public function store(StoreJobRequest $request): JsonResponse
    {
        $job = Job::create($request->validated());

        return response()->json([
            'message' => 'Job created successfully.',
            'data' => $job,
        ], 201);
    }

    public function destroy(Job $job): JsonResponse
    {
        $job->delete();

        return response()->json([
            'message' => 'Job deleted successfully.',
        ]);
    }
}
