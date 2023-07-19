<?php

namespace App\Http\Requests\Device;

use Illuminate\Foundation\Http\FormRequest;

class SetAddressRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'address' => 'required|string'
        ];
    }
}
