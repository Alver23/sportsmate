<?php

namespace SportsMate\Providers;

use Illuminate\Console\AppNamespaceDetectorTrait;
use Illuminate\Support\ServiceProvider;

class ComposerServiceProvider extends ServiceProvider
{
    use AppNamespaceDetectorTrait;

    private $layout = 'admin';
    private $path = 'layouts.';
    private $nav = 'nav';
    private $pathView = 'admin.';

    /**
     * Bootstrap the application services
     * @return void
     */
    public function boot()
    {
        if (\Schema::hasTable('menus')) {
            view()->composer(
                //$this->pathView . 'partial.' . $this->nav,
                $this->path . $this->layout,
                $this->getAppNamespace() .'Http\ViewComposers\MenuComposer'
            );
        }
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
