@extends('app')

@section('content')
<div class="w-100 h-100 bg-light d-flex flex-column justify-content-center align-items-center">
    <form class="login-form bg-white shadow p-5 rounded">
        <h2 class="mb-4">Login</h2>

        @if(!empty($users))
        <ul class="list-group mb-4">
            @foreach($users as $user)
            <li class="list-group-item">
                <div class="d-flex flex-column">
                    <div class="d-flex">
                        Email: <strong class="ms-2">{{ $user->email }}</strong>
                    </div>
                    <div class="d-flex">
                        Password: <strong class="ms-2">1234</strong>
                    </div>
                    <div class="d-flex">
                        Role: <strong class="ms-2">{{ $user->role }}</strong>
                    </div>
                </div>
            </li>
            @endforeach
        </ul>
        @endif

        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email</label>
            <input type="email" name="email" class="form-control">
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" name="password" class="form-control" name="password">
        </div>
        <button type="submit" class="btn btn-primary mt-3 w-100">Login</button>
    </form>
</div>
@endsection
