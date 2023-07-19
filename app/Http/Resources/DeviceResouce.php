<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DeviceResouce extends JsonResource
{
    /**
     * @param Request $request
     * @return array
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'imei' => $this->imei,
            'lat' => $this->lat,
            'lng' => $this->lng,
            'address' => $this->address,
            $this->mergeWhen($this->pivot, function () {
                return ['active' => $this->pivot->active];
            }),
            'users_count' => $this->users_count ?? 0
        ];
    }
}
