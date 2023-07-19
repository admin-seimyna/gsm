<?php

namespace App\Http\Controllers\Device;

use App\Http\Controllers\Controller;
use App\Http\Resources\DeviceResouce;
use App\Models\Device;
use App\Scopes\UserDevicesScope;
use Illuminate\Http\JsonResponse;

class NearestDeviceController extends Controller
{
    /**
     * @param Device $device
     * @return JsonResponse
     */
    public function __invoke(Device $device): JsonResponse
    {
        $device = Device::withoutGlobalScope(new UserDevicesScope)
            ->select('imei')
            ->distanceFrom($device->lat, $device->lng)
            ->where('id', '!=', $device->id)
            ->first();

        if (!$device) {
            abort(404);
        }

        return DeviceResouce::make($device)
            ->response()
            ->setStatusCode(200);
    }
}
