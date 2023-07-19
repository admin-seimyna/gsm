<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;

class ViewController extends Controller
{
    /**
     * @return Application|\Illuminate\Contracts\View\Factory|View
     */
    public function __invoke()
    {
        return view('index', ['apiKey' => config('google.api_key')]);
    }
}
