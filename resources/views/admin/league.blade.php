@extends('layouts.admin')
@section('title', 'Leagues')
@section('content')
    <section class="content-header">
        <h1>Dashboard <small>Control panel</small></h1>
        <ol class="breadcrumb">
            <li><a href="/"><i class="fa fa-dashboard"></i> Home</a></li>
            <li class="active">League</li>
        </ol>
    </section>
    <section class="content">
        @include('admin.partial.infoBoxContent', ['text' => 'Form League', 'rows' => $rows])
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                @include('alerts.errorsOrSuccess', ['method' => 'ajax', 'id' => 'form-message-error', 'typeAlert' => 'danger'])
                @include('alerts.errorsOrSuccess', ['method' => 'ajax', 'id' => 'form-message-success', 'typeAlert' => 'success'])
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="box box-primary collapsed-box" id="boxFormLeague">
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
          <form action="" method="post" id="formLeague">
            {{ csrf_field() }}
            {{ method_field('POST') }}
            <input type="hidden" name="league_id">
            <div class="box-body">
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                        <div class="form-group">
                            <label for="name"><span class="text-red">*</span> Name:</label>
                            <input type="text" class="form-control" name="name">
                        </div>
                        <div class="form-group">
                            <label for="league_sport_id"><strong class="text-red">*</strong>Sport</label>
                            <select name="sport_id" id="league_sport_id" class="form-control select2" style="width: 100%;">
                                <option value="">[Select Option]</option>
                                @foreach ($sports as $sport)
                                    <option value="{{ $sport->id }}">{{ $sport->name }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="league_season">Season</label>
                            <input type="text" name="season" id="league_season" class="form-control">
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                        <div class="form-group">
                            <label for="league_country_id">Country</label>
                            <select name="country_id" id="league_country_id" class="form-control select2" style="width: 100%;">
                                <option value="">[Select Option]</option>
                                @foreach ($countries as $country)
                                    <option value="{{ $country->id }}">{{ $country->name }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="league_division">Division</label>
                            <input type="text" name="division" id="league_division" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="league_point">Point</label>
                            <input type="number" name="points" id="league_point" class="form-control">
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
                            List Leagues
                        </div>
                        <div class="box-tools pull-right">
                          <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                          </button>
                        </div>
                    </div>
                    <div class="box-body">
                        <table class="table table-bordered table-hover dataTable" id="league_table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Country</th>
                                    <th>Sport</th>
                                    <th>Point</th>
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