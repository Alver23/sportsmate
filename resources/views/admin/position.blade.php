@extends('layouts.admin')
@section('title', 'Position')
@section('content')
    <section class="content-header">
        <h1>Dashboard <small>Control panel</small></h1>
        <ol class="breadcrumb">
            <li><a href="/"><i class="fa fa-dashboard"></i> Home</a></li>
            <li class="active">Positions</li>
        </ol>
    </section>
    <section class="content">
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="info-box ">
                  <!-- Apply any bg-* class to to the icon to color it -->
                  <span class="info-box-icon bg-aqua"><i class="fa fa-info-circle"></i></span>
                  <div class="info-box-content">
                    <span class="info-box-text">Form Position</span>
                    <span class="info-box-number"># {{ $rows }}</span>
                  </div><!-- /.info-box-content -->
                </div><!-- /.info-box -->
            </div>
        </div>
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
                <strong>Note:</strong> <span class="text-red">*</span> indicates required field.
            </p>
            <div class="box-tools pull-right">
              <button type="button" class="btn btn-box-tool" data-widget="collapse2"><i class="fa fa-plus"></i>
              </button>
            </div>
          </div>
          <form action="" method="post" id="formPosition">
            {{ csrf_field() }}
            {{ method_field('POST') }}
            <input type="hidden" name="position_id">
            <div class="box-body">
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                        <div class="form-group">
                            <label for="name"><span class="text-red">*</span> Name:</label>
                            <input type="text" class="form-control" name="name"  value="{{ old('name') }}">
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                        <div class="form-group">
                            <label for="description">Description:</label>
                            <textarea name="description" class="form-control" value="{{ old('description') }}"> </textarea>
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
                            List Positions
                        </div>
                        <div class="box-tools pull-right">
                          <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                          </button>
                        </div>
                    </div>
                    <div class="box-body">
                        <table class="table table-bordered table-hover dataTable" id="position_table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
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