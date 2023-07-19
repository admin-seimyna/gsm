<?php

namespace Database\Seeders;

use App\Models\Device;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserDevicesSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $devices = Device::select('id')->pluck('id');
        User::get()->each(static function (User $user) use ($devices) {
            $user->devices()->sync($devices->random(5000));
        });
    }
}
