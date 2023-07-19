<?php

namespace App\Http\Requests\Device;

use App\Models\Device;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'name' => 'required|min:3',
            'imei' => 'required',
            'lat' => 'required|numeric|between:-90,90',
            'lng' => 'required|numeric|between:-120,120',
        ];
    }

    /**
     * @return Device
     */
    public function getDevice(): Device
    {
        return Auth::user()->devices()->where('imei', $this->input('imei'))->first() ?? new Device();
    }
}
