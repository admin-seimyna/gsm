<?php

namespace App\Policies;

use App\Models\Device;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class DevicePolicy
{
    use HandlesAuthorization;

    /**
     * @param User $user
     * @param Device $device
     * @return bool
     */
    public function update(User $user, Device $device): bool
    {
        return $user->isAdmin() || $user->id === $device->created_by;
    }
}
