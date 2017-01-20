@extends('layouts.login')
@section('content')
    <div class="register-box">
        <div class="register-logo">
            <a href="{{ url('login') }}"><b>Admin</b>LTE</a>
        </div>
        <div class="register-box-body">
          <p class="login-box-msg">Register a new membership</p>
          <form action="{{ url('register') }}" method="post">
            {{ csrf_field() }}
            <div class="form-group has-feedback{{ $errors->has('name') ? ' has-error' : '' }}">
              <input type="text" class="form-control" name="name" value="{{ old('name') }}" placeholder="Full name">
              <span class="glyphicon glyphicon-user form-control-feedback"></span>
              @if ($errors->has('name'))
                <p class="text-red">
                  {{ $errors->first('name') }}
                </p>
              @endif
            </div>
            <div class="form-group has-feedback{{ $errors->has('email') ? ' has-error' : '' }}">
              <input type="email" name="email" value="{{ old('email') }}" class="form-control" placeholder="Email">
              <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
              @if ($errors->has('email'))
                <p class="text-red">{{ $errors->first('email') }}</p>
              @endif
            </div>
            <div class="form-group has-feedback">
              <select name="type_member_id" class="form-control">
                @foreach ($rows as $row)
                  <option value="{{ $row->id }}">{{ $row->name }}</option>
                @endforeach
              </select>
            </div>
            <div class="form-group has-feedback{{ $errors->has('password') ? ' has-error' : '' }}">
              <input type="password" name="password" class="form-control" placeholder="Password">
              <span class="glyphicon glyphicon-lock form-control-feedback"></span>
              @if ($errors->has('password'))
                <p class="text-red">{{ $errors->first('password') }}</p>
              @endif
            </div>
            <div class="form-group has-feedback{{ $errors->has('password_confirmation') ? ' has-error' : '' }}">
              <input type="password" name="password_confirmation" class="form-control" placeholder="Retype password">
              <span class="glyphicon glyphicon-log-in form-control-feedback"></span>
              @if ($errors->has('password_confirmation'))
                <p class="text-red">{{ $errors->first('password_confirmation') }}</p>
              @endif
            </div>
            <div class="row">
              <div class="col-xs-8">
                <div class="checkbox icheck">
                  <label>
                    <input type="checkbox"> I agree to the <a href="#">terms</a>
                  </label>
                </div>
              </div>
              <!-- /.col -->
              <div class="col-xs-4">
                <button type="submit" class="btn btn-primary btn-block btn-flat">Register</button>
              </div>
              <!-- /.col -->
            </div>
          </form>
          <a href="{{ url('login') }}" class="text-center">I already have a membership</a>
        </div>
    </div>
@endsection
