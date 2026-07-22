<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Introduction;
use App\Models\Career;
use App\Models\Education;
use Illuminate\Http\JsonResponse;

class AboutController extends Controller
{
    public function index(): JsonResponse
    {
        $introduction = Introduction::where('is_active', true)->first();
        
        $careers = Career::with('details')
            ->orderBy('sort_order', 'asc')
            ->orderBy('start_date', 'desc')
            ->get();
            
        $educations = Education::orderBy('sort_order', 'asc')
            ->orderBy('start_year', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'introduction' => $introduction,
                'careers' => $careers,
                'educations' => $educations
            ]
        ]);
    }
}
