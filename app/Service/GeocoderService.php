<?php

namespace App\Service;

use App\Models\Device;
use Geocoder\Provider\GoogleMaps\GoogleMaps;
use Geocoder\Query\ReverseQuery;
use Geocoder\StatefulGeocoder;
use GuzzleHttp\Client;

class GeocoderService
{
    /**
     * @var Device
     */
    protected Device $device;

    /**
     * @param Device $device
     */
    public function __construct(Device $device)
    {
        $this->device = $device;
    }

    /**
     * @param Device $device
     * @return static
     */
    static function init(Device $device)
    {
        return new static ($device);
    }

    /**
     * @return string|null
     * @throws \Geocoder\Exception\Exception
     */
    public function getAddress() :?string
    {
        $httpClient = new Client();
        $provider = new GoogleMaps($httpClient, null, config('google.api_key'));
        $geocoder = new StatefulGeocoder($provider, 'lt');

        $result = $geocoder->reverseQuery(ReverseQuery::fromCoordinates($this->device->lat, $this->device->lng));
        $address = '';
        try {
            $location = $result->first();
            $address = collect([
                $location->getStreetNumber(),
                $location->getStreetName(),
                $location->getLocality(),
                $location->getPostalCode(),
                $location->getSubLocality(),
                $location->getCountry(),
            ])->filter()->join(' ');
        } catch (\Exception $exception) {

        }

        return $address;
    }
}
