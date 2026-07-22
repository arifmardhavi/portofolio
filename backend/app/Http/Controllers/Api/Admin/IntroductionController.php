<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Introduction;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class IntroductionController extends Controller
{
    public function index(): JsonResponse
    {
        $introductions = Introduction::latest()->get();
        return response()->json([
            'success' => true,
            'data' => $introductions
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'content' => 'required|array',
            'content.*' => 'required|string',
            'is_active' => 'boolean'
        ]);

        if ($request->is_active) {
            Introduction::query()->update(['is_active' => false]);
        }

        $introduction = Introduction::create($validated);

        return response()->json([
            'success' => true,
            'data' => $introduction
        ], 201);
    }

    public function show(Introduction $introduction): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $introduction
        ]);
    }

    public function update(Request $request, Introduction $introduction): JsonResponse
    {
        $validated = $request->validate([
            'content' => 'required|array',
            'content.*' => 'required|string',
            'is_active' => 'boolean'
        ]);

        if ($request->is_active && !$introduction->is_active) {
             Introduction::query()->update(['is_active' => false]);
        }

        $introduction->update($validated);

        return response()->json([
            'success' => true,
            'data' => $introduction
        ]);
    }

    public function destroy(Introduction $introduction): JsonResponse
    {
        $introduction->delete();

        return response()->json([
            'success' => true,
            'message' => 'Introduction deleted'
        ]);
    }
}
