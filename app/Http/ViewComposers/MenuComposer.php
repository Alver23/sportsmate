<?php
/**
 * Created by PhpStorm.
 * User: agrisales
 * Date: 21/01/17
 * Time: 01:54 AM
 */

namespace App\Http\ViewComposers;


use App\Factories\MenuFactory;
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