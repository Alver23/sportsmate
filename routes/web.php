<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

Auth::routes();

Route::group(['middleware' => 'auth'], function () {
    Route::get('/', function () {
        return view('welcome');
    });
    Route::get('/', 'HomeController@index');
    Route::get('/home', 'HomeController@index');

    Route::resource('type-members', 'TypeMemberController');

    Route::resource('permissions', 'PermissionController');

    Route::resource('roles', 'RoleController');

    Route::resource('positions', 'PositionController');

    Route::resource('categories', 'CategoryController');

    Route::resource('organizations', 'OrganizationController');

    Route::resource('users', 'UserController');

    Route::resource('uniforms', 'UniformController');

    Route::resource('teams', 'TeamController');

    Route::resource('leagues', 'LeagueController');
});
