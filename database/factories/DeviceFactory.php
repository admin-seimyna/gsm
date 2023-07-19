<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class DeviceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'imei' => $this->faker->imei(),
            'lat' => $this->faker->latitude(),
            'lng' => $this->faker->longitude(),
            'address' => $this->faker->address()
        ];
    }
}
