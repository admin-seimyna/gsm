<?php

namespace App\Http\Controllers\Map;

use App\Http\Controllers\Controller;
use App\Http\Resources\DeviceResouce;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MarkedDevicesController extends Controller
{
    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function __invoke(Request $request): JsonResponse
    {
        $farthestDevice = Auth::user()
            ->devices()
            ->distanceFrom(0, 0, false)
            ->first();

        if ($farthestDevice) {
            $secondDevice = Auth::user()
                ->devices()
                ->distanceFrom($farthestDevice->lat, $farthestDevice->lng, false)
                ->first();
        }

        return DeviceResouce::collection(collect($farthestDevice && $secondDevice ? [$farthestDevice, $secondDevice] : []))
            ->response()
            ->setStatusCode(200);
    }
}
