<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', \App\Http\Controllers\ViewController::class);

Route::group(['middleware' => 'guest'], static function () {
    Route::group(['as' => 'login', 'prefix' => 'login', 'middleware'], static function () {
        Route::get('view', \App\Http\Controllers\Login\ViewController::class)->name('view');
        Route::post('/', \App\Http\Controllers\Login\PostController::class)->name('post');
    });
});

Route::group(['middleware' => 'auth'], static function () {
    Route::get('/logout', \App\Http\Controllers\LogoutController::class)->name('logout');

    Route::group(['as' => 'map.', 'prefix' => 'map'], static function () {
        Route::get('view', \App\Http\Controllers\Map\ViewController::class)->name('view');
        Route::post('devices', \App\Http\Controllers\Map\DevicesController::class)->name('devices');
        Route::get('user-devices', \App\Http\Controllers\Map\UserDevicesController::class)->name('user-devices');
        Route::get('devices-count', \App\Http\Controllers\Map\GetDevicesCount::class)->name('devices-count');
        Route::get('marked-devices', \App\Http\Controllers\Map\MarkedDevicesController::class)->name('marked-devices');
    });

    Route::group(['as' => 'device.', 'prefix' => 'device'], static function () {
        Route::post('/', \App\Http\Controllers\Device\CreateDeviceController::class)->name('create');
        Route::get('{device}/find-nearest-device', \App\Http\Controllers\Device\NearestDeviceController::class)->name('find-nearest-device');
        Route::put('{device}/change-status', \App\Http\Controllers\Device\ChangeDeviceStatusController::class)->name('change-status');
        Route::put('{device}/set-users', \App\Http\Controllers\Device\SetDeviceUsersController::class)->name('set-users')->middleware('admin');
    });

    Route::group(['as' => 'dashboard.', 'prefix' => 'dashboard', 'middleware' => ['admin']], static function () {
        Route::get('view', \App\Http\Controllers\Dashboard\ViewController::class)->name('dashboard');
        Route::get('devices', \App\Http\Controllers\Dashboard\DevicesController::class)->name('dashboard');
    });
});
