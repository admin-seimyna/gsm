<?php

namespace App\Http\Controllers\Login;

use App\Http\Controllers\Controller;
use App\Http\Requests\Login\PostRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * @param PostRequest $postRequest
     * @return JsonResponse
     */
    public function __invoke(PostRequest $postRequest): JsonResponse
    {
        return response()->json(['success' => true]);
    }
}
