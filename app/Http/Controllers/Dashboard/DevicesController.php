<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\DevicesRequest;
use App\Http\Resources\DeviceResouce;
use App\Models\Device;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DevicesController extends Controller
{
    /**
     * @param DevicesRequest $request
     * @return JsonResponse
     */
    public function __invoke(DevicesRequest $request): JsonResponse
    {
        $result = Device::withCount('users')
            ->when($request->getSortColumn(), static function (Builder $builder, $column) use ($request) {
                $builder->orderBy($column, $request->getSortType());
            })
            ->paginate();
        return DeviceResouce::collection($result)
            ->response()
            ->setStatusCode(200);
    }
}
