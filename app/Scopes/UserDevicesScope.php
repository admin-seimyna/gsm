<?php

namespace App\Scopes;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;
use Illuminate\Support\Facades\Auth;

class UserDevicesScope implements Scope
{
    /**
     * @param Builder $builder
     * @param Model $model
     */
    public function apply(Builder $builder, Model $model)
    {
        $user = Auth::user();
        if ($user->isAdmin()) {
            return;
        }

        $builder->whereHas('users', static function (Builder $builder) use ($user) {
            $builder->where('id', $user->id);
        });
    }
}
