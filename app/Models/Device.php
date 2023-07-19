<?php

namespace App\Models;

use App\Service\GeocoderService;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\Auth;

class Device extends Model
{
    use HasFactory;

    /**
     * @var string[]
     */
    protected $fillable = [
        'name',
        'lat',
        'lng',
        'address',
        'imei',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(static function (Device $device) {
            $device->address = GeocoderService::init($device)->getAddress();
            $device->created_by = Auth::id();
        });

        static::updating(static function (Device $device) {
            $dirty = $device->getDirty();
            if (!empty($dirty['lat']) || !empty($dirty['lng'])) {
                $device->address = GeocoderService::init($device)->getAddress();
            }
        });
    }

    /**
     * @param Builder $builder
     * @param float $lat
     * @param float $lng
     * @param bool $nearest
     * @return Builder
     */
    public function scopeDistanceFrom(Builder $builder, float $lat, float $lng, bool $nearest = true): Builder
    {
        return $builder->orderByRaw('
               (ST_Distance_Sphere(
                    point(lng,lat),
                    point(?,?)
                ) * 0.000621371192) ' . ($nearest ? 'ASC' : 'DESC')
            ,[$lng, $lat]);
    }

    /**
     * @return BelongsToMany
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_devices')
            ->withPivot('active');
    }
}
