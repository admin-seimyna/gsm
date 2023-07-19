@auth
<nav class="app-navigation navigation navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
        <span class="navbar-brand">DEMO</span>
        <div class="collapse navbar-collapse">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link" href="#map">Map</a>
                </li>
                @if(auth()->user()->isAdmin())
                    <li class="nav-item">
                        <a class="nav-link" href="#dashboard">Dashboard</a>
                    </li>
                @endif
            </ul>

            <a href="/logout">Logout</a>
        </div>
    </div>
</nav>
@endauth

<div class="app-content">
    @yield('content')
</div>
