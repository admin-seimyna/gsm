<?php

namespace App\Http\Controllers\Login;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;

class ViewController extends Controller
{
    /**
     * @return Application|Factory|View
     */
    public function __invoke()
    {
        $userQuery = User::select('email', 'role');
        return view('login', [
            'users' => [
                $userQuery->clone()->where('role', User::ROLE_ADMIN)->first(),
                $userQuery->clone()->where('role', '!=', User::ROLE_ADMIN)->first()
            ]
        ]);
    }
}
