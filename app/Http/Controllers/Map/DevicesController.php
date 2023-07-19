<?php

namespace App\Http\Controllers\Map;

use App\Http\Controllers\Controller;
use App\Http\Requests\Map\DevicesRequest;
use App\Http\Resources\DeviceResouce;
use App\Models\Device;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class DevicesController extends Controller
{
    /**
     * @param DevicesRequest $devicesRequest
     * @return JsonResponse
     */
    public function __invoke(DevicesRequest $devicesRequest): JsonResponse
    {
        $devices =  Auth::user()->devices()
            ->select('id', 'name', 'address', 'imei', 'lat', 'lng')
            ->whereBetween('lat', $devicesRequest->getLatitudeCoordinates())
            ->whereBetween('lng', $devicesRequest->getLongitudeCoordinates())
            ->when(!empty($devicesRequest->input('devices')), static function (Builder $builder) use ($devicesRequest) {
                $builder->whereNotIn('id', $devicesRequest->input('devices'));
            })
            ->get();

        return DeviceResouce::collection($devices)
            ->response()
            ->setStatusCode(200);
    }
}
