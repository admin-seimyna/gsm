<?php

namespace App\Http\Controllers\Device;

use App\Http\Controllers\Controller;
use App\Http\Requests\Device\CreateRequest;
use App\Http\Resources\DeviceResouce;
use App\Models\Device;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class CreateDeviceController extends Controller
{
    /**
     * @param CreateRequest $createRequest
     * @return JsonResponse
     */
    public function __invoke(CreateRequest $request): JsonResponse
    {
        $device = $request->getDevice();
        if ($device->id) {
            Gate::authorize('update', $device);
        }

        $device->fill(
            $device->id ? $request->only(['lat', 'lng']) : $request->validated()
        )->save();
        Auth::user()->devices()->syncWithoutDetaching([$device->id]);

        return DeviceResouce::make($device)
            ->response()
            ->setStatusCode(200);
    }
}
