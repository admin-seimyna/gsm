<?php

namespace App\Http\Requests\Login;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class PostRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'email' => 'required|email|exists:users',
            'password' => 'required'
        ];
    }

    /**
     * @return mixed
     */
    protected function getValidatorInstance()
    {
        $instance = parent::getValidatorInstance();
        if (method_exists($this, 'after')) {

            return $instance->after([$this, 'after']);
        }

        return $instance;
    }

    /**
     * @param Validator $validator
     */
    public function after(Validator $validator)
    {
        if (empty($this->input('email')) || empty($this->input('password'))) {
            return;
        }

        $attempt = Auth::attempt([
            'email' => $this->input('email'),
            'password' => $this->input('password')
        ]);

        if (!$attempt) {
            $validator->errors()->add('password', trans('auth.failed'));
        }
    }
}
