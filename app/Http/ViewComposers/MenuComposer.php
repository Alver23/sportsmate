<?php
/**
 * Created by PhpStorm.
 * User: agrisales
 * Date: 21/01/17
 * Time: 01:54 AM
 */

namespace SportsMate\Http\ViewComposers;


use SportsMate\Factories\MenuFactory;
use Illuminate\Http\Request;
use Illuminate\View\View;

class MenuComposer
{
    private $request;
    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function compose(View $view)
    {
        $data = MenuFactory::menusHasRol();
        $view->with('menus', $data);
    }
}