@extends('layouts.login')
@section('content')

<div class="login-box">
  <div class="login-logo">
    <a href="./"><b>Sports</b> Mate</a>
  </div>
  @if (session('activationStatus'))
    <div class="alert alert-success">
      {{ trans('auth.activationStatus') }}
    </div>
	@endif

	@if (session('activationWarning'))
    <div class="alert alert-warning">
      {{ trans('auth.activationWarning') }}
    </div>
	@endif
  <!-- /.login-logo -->
  <div class="login-box-body">
    <p class="login-box-msg">Sign in to start your session</p>
    <form method="POST" action="{{ url('/login') }}">
    	{{ csrf_field() }}
		<div class="form-group has-feedback{{ $errors->has('email') ? ' has-error' : '' }}">
			<input type="email" name="email" class="form-control" placeholder="Email" value="{{ old('email') }}">
			<span class="glyphicon glyphicon-envelope form-control-feedback"></span>
			@if ($errors->has('email'))
			    <p class="text-red">{{ $errors->first('email') }}</p>
			@endif
		</div>
		<div class="form-group has-feedback">
			<input type="password" name="password" class="form-control" placeholder="Password">
			<span class="glyphicon glyphicon-lock form-control-feedback"></span>
			@if ($errors->has('password'))
			    <p class="text-red">{{ $errors->first('password') }}</p>
			@endif
		</div>
		@if(Session::has('message-error'))
			<div class="alert alert-danger" role="alert">
				{{ Session::get('message-error') }}
			</div>
		@endif
		<div class="row">
			<div class="col-xs-8">
			  <div class="checkbox icheck">
			    <label>
			      <input type="checkbox" name="checkbox" value="1"> Remember Me
			    </label>
			  </div>
			</div>
			<div class="col-xs-4">
			  <button type="submit" class="btn btn-primary btn-block btn-flat">Sign In</button>
			</div>
		</div>
    </form>

    <a href="#">I forgot my password</a><br>
    <a href="{{ url('register') }}" class="text-center">Register a new membership</a>
  </div>
  <!-- /.login-box-body -->
</div>
@endsection