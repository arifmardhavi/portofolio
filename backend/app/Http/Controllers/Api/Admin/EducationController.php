<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Education;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class EducationController extends Controller
{
    public function index(): JsonResponse
    {
        $educations = Education::orderBy('sort_order', 'asc')
            ->orderBy('start_year', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $educations
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'institution_name' => 'required|string|max:255',
            'institution_logo' => 'nullable|string',
            'institution_url' => 'nullable|url',
            'degree' => 'required|string|max:255',
            'major' => 'required|string|max:255',
            'score' => 'nullable|string|max:50',
            'start_year' => 'required|integer|min:1900|max:' . (date('Y') + 10),
            'end_year' => 'nullable|integer|gte:start_year',
            'location' => 'required|string|max:255',
            'country_code' => 'nullable|string|size:2',
            'sort_order' => 'integer',
        ]);

        $education = Education::create($validated);

        return response()->json([
            'success' => true,
            'data' => $education
        ], 201);
    }

    public function show(Education $education): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $education
        ]);
    }

    public function update(Request $request, Education $education): JsonResponse
    {
        $validated = $request->validate([
            'institution_name' => 'required|string|max:255',
            'institution_logo' => 'nullable|string',
            'institution_url' => 'nullable|url',
            'degree' => 'required|string|max:255',
            'major' => 'required|string|max:255',
            'score' => 'nullable|string|max:50',
            'start_year' => 'required|integer|min:1900|max:' . (date('Y') + 10),
            'end_year' => 'nullable|integer|gte:start_year',
            'location' => 'required|string|max:255',
            'country_code' => 'nullable|string|size:2',
            'sort_order' => 'integer',
        ]);

        $education->update($validated);

        return response()->json([
            'success' => true,
            'data' => $education
        ]);
    }

    public function destroy(Education $education): JsonResponse
    {
        $education->delete();

        return response()->json([
            'success' => true,
            'message' => 'Education deleted'
        ]);
    }
}
