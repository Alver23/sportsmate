@extends('layouts.admin')
@section('title', 'Teams')
@section('content')
    <section class="content-header">
        <h1>Dashboard <small>Control panel</small></h1>
        <ol class="breadcrumb">
            <li><a href="/"><i class="fa fa-dashboard"></i> Home</a></li>
            <li class="active">Teams</li>
        </ol>
    </section>
    <section class="content">
        @include('admin.partial.infoBoxContent', ['text' => 'Form Team', 'rows' => $rows])
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                @include('alerts.errorsOrSuccess', ['method' => 'ajax', 'id' => 'form-message-error', 'typeAlert' => 'danger'])
                @include('alerts.errorsOrSuccess', ['method' => 'ajax', 'id' => 'form-message-success', 'typeAlert' => 'success'])
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="box box-primary collapsed-box" id="boxFormTeam">
                    <div class="box-header">
            <h3 class="box-title">Create New Record</h3>
            <p>
                <strong>Note:</strong> <span class="text-red">*</span> indicates required field.
            </p>
            <div class="box-tools pull-right">
              <button type="button" class="btn btn-box-tool" data-widget="collapse2"><i class="fa fa-plus"></i>
              </button>
            </div>
          </div>
          <form action="" method="post" id="formTeam">
            {{ csrf_field() }}
            {{ method_field('POST') }}
            <input type="hidden" name="team_id">
            <div class="box-body">
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                        <div class="form-group">
                            <label for="name"><span class="text-red">*</span> Name:</label>
                            <input type="text" class="form-control" name="name">
                        </div>
                        <div class="form-group">
                            <label for="sport_id"><strong class="text-red">*</strong>Sport</label>
                            <select name="sport_id" id="team_sport_id" class="form-control select2" style="width: 100%;">
                                <option value="">[Select Option]</option>
                                @foreach ($sports as $sport)
                                    <option value="{{ $sport->id }}">{{ $sport->name }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="home_uniform_id"><strong class="text-red">*</strong>Home Uniform</label>
                            <select name="home_uniform_id" id="home_uniform_id" class="form-control select2" style="width: 100%;">
                                <option value="">[Select Option]</option>
                                @foreach ($uniforms as $uniform)
                                    <option value="{{ $uniform->id }}">{{ $uniform->name }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="description">Description:</label>
                            <textarea name="description" class="form-control"> </textarea>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                        <div class="form-group">
                            <label for="category_id"><strong class="text-red">*</strong>Category</label>
                            <select name="category_id" id="team_category_id" class="form-control select2" style="width: 100%;">
                                <option value="">[Select Option]</option>
                                @foreach ($categories as $category)
                                    <option value="{{ $category->id }}">{{ $category->name }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="country_id">Country</label>
                            <select name="country_id" id="team_country_id" class="form-control select2" style="width: 100%;">
                                <option value="">[Select Option]</option>
                                @foreach ($countries as $country)
                                    <option value="{{ $country->id }}">{{ $country->name }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="away_uniform_id"><strong class="text-red">*</strong>Away Uniform</label>
                            <select name="away_uniform_id" id="away_uniform_id" class="form-control select2" style="width: 100%;">
                                <option value="">[Select Option]</option>
                                @foreach ($uniforms as $uniform)
                                    <option value="{{ $uniform->id }}">{{ $uniform->name }}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="box-footer">
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <button type="submit" class="btn btn-primary"><i class="fa fa-save"></i> Save</button>
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
                            List Teams
                        </div>
                        <div class="box-tools pull-right">
                          <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                          </button>
                        </div>
                    </div>
                    <div class="box-body">
                        <table class="table table-bordered table-hover dataTable" id="team_table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Country</th>
                                    <th>Sport</th>
                                    <th>Category</th>
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