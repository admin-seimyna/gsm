<?php

namespace App\Http\Controllers\Device;

use App\Http\Controllers\Controller;
use App\Models\Device;
use App\Policies\DevicePolicy;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class ChangeDeviceStatusController extends Controller
{
    /**
     * @param Device $device
     * @param Request $request
     * @return JsonResponse
     */
    public function __invoke(Device $device, Request $request): JsonResponse
    {
        Gate::authorize('update', $device);
        $device->users()->updateExistingPivot(Auth::user(), ['active' => $request->input('status', 1)]);
        return response()->json(['success' => 1]);
    }
}
