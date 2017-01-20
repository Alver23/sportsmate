<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMenusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('menus', function (Blueprint $table) {
            $table->increments('id');
            $table->uuid('uuid')->nullable()->unique()->index();
            $table->integer('language_id')->unsigned()->comment('lenguaje correspondiente')->default(2);
            $table->integer('parent_menu_id')->unsigned()->comment('Identifica si es un menu hijo, en caso contrario es null')->nullable();
            $table->integer('image_id')->unsigned()->nullable()->comment('Imagen para el menu si lo lleva');
            $table->integer('map_url_id')->unsigned()->nullable()->comment('URL donde apunta esté item del menu');
            $table->string('name', 80);
            $table->text('description')->nullable();
            $table->tinyInteger('orden')->comment('Orden para los item del menu');
            $table->tinyInteger('view_name')->default(0)->comment('show = 0, hidden = 1');
            $table->enum('target', ['_blank', '_self', 'parent', 'top'])->comment('como se desea abrir el link interno o externo, si en una ventana nueva o en la misma')->default('_blank');
            $table->enum('type_url', ['interna', 'externa', 'hastag'])->nullable()->comment('Tipo de url del menu, interna, externa o hastag')->default('interna');
            $table->enum('type_menu', ['superior', 'inferior'])->comment('Tipo de menu, ejemplo: superior, inferior')->default('superior');
            $table->tinyInteger('is_disabled')->default(0)->comment('enable = 0, disabled = 1');
            $table->string('ip_address', 15)->default('127.0.0.1');
            $table->integer('owner_user_id')->unsigned()->nullable();
            $table->integer('updater_user_id')->unsigned()->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->foreign('image_id')->references('id')->on('files');
            $table->foreign('language_id')->references('id')->on('languages');
            $table->foreign('owner_user_id')->references('id')->on('users');
            $table->foreign('updater_user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('menus');
    }
}
