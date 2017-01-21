@extends('layouts.admin')
@section('title', 'Users')
@section('content')
<style type="text/css" media="screen">
    .password{
    position: relative;
}

.password input[type="password"]{
    padding-right: 30px;
}

.password .glyphicon,#password2 .glyphicon {
    display:none;
    right: 15px;
    position: absolute;
    top: 12px;
    cursor:pointer;

</style>
    <section class="content-header">
        <h1>Dashboard <small>Control panel</small></h1>
        <ol class="breadcrumb">
            <li><a href="/"><i class="fa fa-dashboard"></i> Home</a></li>
            <li class="active">Users</li>
        </ol>
    </section>
    <section class="content">
        @include('admin.partial.infoBoxContent', ['text' => 'Form User', 'rows' => $rows])
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                @include('alerts.errorsOrSuccess', ['method' => 'ajax', 'id' => 'form-message-error', 'typeAlert' => 'danger'])
                @include('alerts.errorsOrSuccess', ['method' => 'ajax', 'id' => 'form-message-success', 'typeAlert' => 'success'])
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="box box-primary collapsed-box" id="boxForm">
                    <div class="box-header">
                        <h3 class="box-title">Create New Record</h3>
                        <p>
                            <strong>Note:</strong><span class="text-red">*</span> indicates required field.
                        </p>
                        <div class="box-tools pull-right">
                          <button type="button" class="btn btn-box-tool" data-widget="collapse2"><i class="fa fa-plus"></i>
                          </button>
                        </div>
                    </div>
                    <form action="" method="post" id="formUser">
                        {{ csrf_field() }}
                        {{ method_field('PUT') }}
                        <input type="hidden" name="user_id">
                        <div class="box-body">
                            <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <ul>
                                        <li>Emails must have a valid email format</li>
                                        <li>Passwords must be at least 6 characters long</li>
                                        <li>Passwords must contain:
                                            <ul>
                                                <li>At least one upper case letter (A..Z)</li>
                                                <li>At least one lower case letter (a..z)</li>
                                                <li>At least one number (0..9)</li>
                                            </ul>
                                        </li>
                                        <li>Your password and confirmation must match exactly</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <div class="box box-primary collapsed-box">
                                        <div class="box-header">
                                            <h3 class="box-title">
                                                Personal Information
                                            </h3>
                                            <div class="box-tools pull-right">
                                                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="box-body">
                                            <div class="row">
                                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                                                    <div class="form-group">
                                                        <label for="first_name"><strong class="text-red">*</strong>First Name:</label>
                                                        <input type="text" name="first_name" class="form-control" maxlength="80">
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="email"><strong class="text-red">*</strong>Email:</label>
                                                        <input type="email" name="email" class="form-control">
                                                    </div>
                                                    <div class="form-group div_password">
                                                        <label for="password"><strong class="text-red">*</strong>Password:</label>
                                                        <div class="password">
                                                            <input type="password" name="password" id="password" class="form-control ignore" required="true" maxlength="50" minlength="6">   
                                                            <span class="glyphicon glyphicon-eye-open open_password"></span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                                                    <div class="form-group">
                                                        <label for="last_name"><strong class="text-red">*</strong>Last Name:</label>
                                                        <input type="text" name="last_name" class="form-control">
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="type_member_id"> <strong class="text-red">*</strong> Type Member:</label>
                                                        <select name="type_member_id" id="type_member_id" class="form-control select2" style="width: 100%;" required="true">
                                                            <option value="">[Select Option]</option>
                                                            @foreach ($typeMembers as $typeMember)
                                                                <option value="{{ $typeMember->id }}">{{ $typeMember->name }}</option>
                                                            @endforeach
                                                        </select>
                                                    </div>
                                                    <div class="form-group div_confirm_password">
                                                        <label for="confirm_password"><strong class="text-red">*</strong>Confirm Password:</label>
                                                        <div class="password">
                                                            <input type="password" name="confirm_password" id="confirm_password" class="form-control ignore" maxlength="50" minlength="6">
                                                            <span class="glyphicon glyphicon-eye-open open_confirm"></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                    <div class="alert alert-info alert-dismissible copyPassword">                   
                                                    </div>
                                                </div>
                                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                    <button type="button" class="btn btn-primary" id="generatePassword"><i class="fa fa-refresh"></i> Generate Password</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <div class="box box-primary collapse2">
                                        <div class="box-header">
                                            <h3 class="box-title">
                                                Contact Information
                                            </h3>
                                            <div class="box-tools pull-right">
                                                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="box-body">
                                            <div class="row">
                                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                                                    <div class="form-group">
                                                        <label for="country_id">Country:</label>
                                                        <select name="country_id" id="country_id" class="form-control select2" style="width: 100%;">
                                                            <option value="">[Select Option]</option>
                                                        </select>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="city_id">City</label>
                                                        <select name="city_id" id="city_id" class="form-control select2" style="width: 100%;">
                                                            <option value="">[Select Option]</option>
                                                        </select>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="address">Address:</label>
                                                        <input type="text" name="address" class="form-control" maxlength="255">
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="phone">Phone:</label>
                                                        <input type="text" name="phone" class="form-control" maxlength="40">
                                                    </div>
                                                </div>
                                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                                                    <div class="form-group">
                                                        <label for="state_id">State:</label>
                                                        <select name="state_id" id="state_id" class="form-control select2" style="width: 100%;">
                                                            <option value="">[Select Option]</option>
                                                        </select>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="zip_code">Zip Code:</label>
                                                        <input type="number" name="zip_code" class="form-control" maxlength="5" minlength="5">
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="date_birthday">Date Birthday:</label>
                                                        <input type="date" name="date_birthday" class="form-control">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row" id="typeMemberPlayer">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <div class="box box-primary collapse2">
                                        <div class="box-header">
                                            <h3 class="box-title">
                                                Player Information
                                            </h3>
                                            <div class="box-tools pull-right">
                                                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="box-body">
                                            <div class="row">
                                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                                                    <div class="form-group">
                                                        <label for="jersey_number">Jersey Number:</label>
                                                        <input type="number" name="jersey_number" id="jersey_number" class="form-control">
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="category_id"><strong class="text-red">*</strong>Category:</label>
                                                        <select name="category_id" id="category_id" class="form-control select2" style="width: 100%;">
                                                            <option value="">[Select Option]</option>
                                                            @foreach ($categories as $category)
                                                                <option value="{{ $category->id }}">{{ $category->name }}</option>
                                                            @endforeach
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                                                    <div class="form-group">
                                                        <label for="position_id"><strong class="text-red">*</strong>Position:</label>
                                                        <select name="position_id" id="position_id" class="form-control select2" style="width: 100%;">
                                                            <option value="">[Select Option]</option>
                                                            @foreach ($positions as $position)
                                                                <option value="{{ $position->id }}">{{ $position->name }}</option>
                                                            @endforeach
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                
                            </div>
                        </div>
                        <div class="box-footer">
                            <div class="row">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <button type="submit" class="btn btn-success" id="buttonSaveOrganization"><i class="fa fa-save"></i> Save</button>
                                    <button type="button" class="btn btn-default" id="close2"><i class="fa fa-close"></i> Close</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="box box-primary">
                    <div class="box-header">
                        <div class="box-title">
                            List Users
                        </div>
                        <div class="box-tools pull-right">
                          <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                          </button>
                        </div>
                    </div>
                    <div class="box-body">
                        <table class="table table-bordered table-hover dataTable" id="user_table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Type</th>
                                    <th>Phone</th>
                                    <th>Activated</th>
                                    <th>Status</th>
                                    <th>Owner User</th>
                                    <th>Updater User</th>
                                    <th>Created At</th>
                                    <th>Updated At</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>
    @include('alerts.modalLoading', ['image' => 'dist/img/loading/hourglass.svg', 'message' => 'Loading....'])
    <!-- Content Header (Page header) -->
@endsection