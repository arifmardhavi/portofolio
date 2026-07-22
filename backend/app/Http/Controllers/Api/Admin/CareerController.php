<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Career;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CareerController extends Controller
{
    public function index(): JsonResponse
    {
        $careers = Career::with('details')
            ->orderBy('sort_order', 'asc')
            ->orderBy('start_date', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $careers
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'company_logo' => 'nullable|string',
            'company_url' => 'nullable|url',
            'role' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'country_code' => 'required|string|size:2',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'status' => 'required|string|in:Full-time,Part-time,Contract,Freelance',
            'work_model' => 'required|string|in:Remote,On-site,Hybrid',
            'sort_order' => 'integer',

            // Details
            'details.responsibilities' => 'nullable|array',
            'details.responsibilities.*' => 'string',
            'details.what_i_learned' => 'nullable|array',
            'details.what_i_learned.*' => 'string',
            'details.impact' => 'nullable|array',
            'details.impact.*' => 'string',
        ]);

        $career = Career::create($validated);

        if ($request->has('details')) {
            $career->details()->create($request->details);
        }

        return response()->json([
            'success' => true,
            'data' => $career->load('details')
        ], 201);
    }

    public function show(Career $career): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $career->load('details')
        ]);
    }

    public function update(Request $request, Career $career): JsonResponse
    {
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'company_logo' => 'nullable|string',
            'company_url' => 'nullable|url',
            'role' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'country_code' => 'required|string|size:2',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'status' => 'required|string|in:Full-time,Part-time,Contract,Freelance',
            'work_model' => 'required|string|in:Remote,On-site,Hybrid',
            'sort_order' => 'integer',

            // Details
            'details.responsibilities' => 'nullable|array',
            'details.what_i_learned' => 'nullable|array',
            'details.impact' => 'nullable|array',
        ]);

        $career->update($validated);

        if ($request->has('details')) {
            if ($career->details) {
                $career->details->update($request->details);
            } else {
                $career->details()->create($request->details);
            }
        }

        return response()->json([
            'success' => true,
            'data' => $career->load('details')
        ]);
    }

    public function destroy(Career $career): JsonResponse
    {
        if ($career->details) {
            $career->details->delete();
        }
        $career->delete();

        return response()->json([
            'success' => true,
            'message' => 'Career deleted'
        ]);
    }
}
