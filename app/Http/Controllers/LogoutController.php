<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Foundation\Application;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\Auth;

class LogoutController extends Controller
{
    /**
     * @param Request $request
     * @return Application|RedirectResponse|Redirector
     */
    public function __invoke(Request $request)
    {
        Auth::logout();
        return redirect('/#login');
    }
}
