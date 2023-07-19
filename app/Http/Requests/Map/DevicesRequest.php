<?php

namespace App\Http\Requests\Map;

use Illuminate\Foundation\Http\FormRequest;

class DevicesRequest extends FormRequest
{
    /**
     * @return string[]
     */
    public function rules(): array
    {
        return [
            'coordinates' => 'array|required',
            'coordinates.lat' => 'array|min:2|max:2',
            'coordinates.lat.*' => 'required|numeric|between:-90,90',
            'coordinates.lng' => 'array|min:2|max:2',
            'coordinates.lng.*' => 'required|numeric|between:-180,180',
            'devices' => 'array|nullable'
        ];
    }

    /**
     * @return array
     */
    public function getLatitudeCoordinates(): array
    {
        return [
            $this->input('coordinates')['lat'][0],
            $this->input('coordinates')['lat'][1],
        ];
    }

    /**
     * @return array
     */
    public function getLongitudeCoordinates(): array
    {
        return [
            $this->input('coordinates')['lng'][0],
            $this->input('coordinates')['lng'][1],
        ];
    }
}
