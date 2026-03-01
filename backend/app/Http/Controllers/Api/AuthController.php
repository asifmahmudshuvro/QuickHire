<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterUserRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;

class AuthController extends Controller
{
    public function login(LoginRequest $request): JsonResponse
    {
        $credentials = $request->validated();
        $throttleKey = strtolower($credentials['email']) . '|' . $request->ip();

        if (RateLimiter::tooManyAttempts($throttleKey, 5)) {
            return response()->json([
                'message' => 'Too many login attempts. Please try again later.',
            ], 429);
        }

        $user = User::where('email', $credentials['email'])->first();

        if (! $user || ! Hash::check($credentials['password'], $user->password)) {
            RateLimiter::hit($throttleKey, 60);

            return response()->json([
                'message' => 'Invalid credentials.',
            ], 422);
        }

        if (! $user->is_admin) {
            return response()->json([
                'message' => 'Admin access is required.',
            ], 403);
        }

        RateLimiter::clear($throttleKey);

        $user->tokens()->delete();

        $token = $user->createToken('quickhire-admin-token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful.',
            'data' => [
                'token' => $token,
                'user' => $this->serializeUser($user),
            ],
        ]);
    }

    public function userRegister(RegisterUserRequest $request): JsonResponse
    {
        $payload = $request->validated();

        $user = User::create([
            'name' => $payload['name'],
            'email' => $payload['email'],
            'password' => $payload['password'],
            'is_admin' => false,
        ]);

        $token = $user->createToken('quickhire-user-token')->plainTextToken;

        return response()->json([
            'message' => 'Account created successfully.',
            'data' => [
                'token' => $token,
                'user' => $this->serializeUser($user),
            ],
        ], 201);
    }

    public function userLogin(LoginRequest $request): JsonResponse
    {
        $credentials = $request->validated();
        $throttleKey = 'user|' . strtolower($credentials['email']) . '|' . $request->ip();

        if (RateLimiter::tooManyAttempts($throttleKey, 5)) {
            return response()->json([
                'message' => 'Too many login attempts. Please try again later.',
            ], 429);
        }

        $user = User::where('email', $credentials['email'])->first();

        if (! $user || ! Hash::check($credentials['password'], $user->password)) {
            RateLimiter::hit($throttleKey, 60);

            return response()->json([
                'message' => 'Invalid credentials.',
            ], 422);
        }

        if ($user->is_admin) {
            return response()->json([
                'message' => 'Please use the admin login page for this account.',
            ], 403);
        }

        RateLimiter::clear($throttleKey);

        $user->tokens()->where('name', 'quickhire-user-token')->delete();
        $token = $user->createToken('quickhire-user-token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful.',
            'data' => [
                'token' => $token,
                'user' => $this->serializeUser($user),
            ],
        ]);
    }

    public function me(Request $request): JsonResponse
    {
        $user = $request->user();

        return response()->json([
            'data' => $user ? $this->serializeUser($user) : null,
        ]);
    }

    public function userMe(Request $request): JsonResponse
    {
        $user = $request->user();

        if (! $user || $user->is_admin) {
            return response()->json([
                'message' => 'User access is required.',
            ], 403);
        }

        return response()->json([
            'data' => $this->serializeUser($user),
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()?->currentAccessToken()?->delete();

        return response()->json([
            'message' => 'Logout successful.',
        ]);
    }

    public function userLogout(Request $request): JsonResponse
    {
        $user = $request->user();

        if (! $user || $user->is_admin) {
            return response()->json([
                'message' => 'User access is required.',
            ], 403);
        }

        $request->user()?->currentAccessToken()?->delete();

        return response()->json([
            'message' => 'Logout successful.',
        ]);
    }

    private function serializeUser(User $user): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'is_admin' => (bool) $user->is_admin,
        ];
    }
}
