<?php

namespace App\Http\Controllers\Map;

use App\Http\Controllers\Controller;
use App\Http\Resources\DeviceResouce;
use App\Models\Device;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserDevicesController extends Controller
{
    /**
     * @return JsonResponse
     */
    public function __invoke(): JsonResponse
    {
        return DeviceResouce::collection(Auth::user()->devices()->select('id', 'name', 'imei', 'lat', 'lng')->paginate())
            ->response()
            ->setStatusCode(200);
    }
}
