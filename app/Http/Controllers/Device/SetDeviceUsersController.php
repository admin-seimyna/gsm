<?php

namespace App\Http\Controllers\Device;

use App\Http\Controllers\Controller;
use App\Http\Requests\Device\UsersRequest;
use App\Http\Resources\DeviceResouce;
use App\Models\Device;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SetDeviceUsersController extends Controller
{
    /**
     * @param Device $device
     * @param UsersRequest $usersRequest
     * @return JsonResponse
     */
    public function __invoke(Device $device, UsersRequest $usersRequest): JsonResponse
    {
        $device->users()->sync($usersRequest->input('users'));
        return DeviceResouce::make($device)->response()->setStatusCode(200);
    }
}
