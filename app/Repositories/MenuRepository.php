<?php
/**
 * Created by PhpStorm.
 * User: agrisales
 * Date: 21/01/17
 * Time: 01:58 AM
 */

namespace SportsMate\Repositories;

use SportsMate\Models\Menu;

class MenuRepository
{
    private $table;
    public function __construct()
    {
        $menu = new Menu();
        $this->table = $menu->getTable();
    }

    /**
     * Obtenemos el menu del usuario dependiendo el rol
     * @param array $roles
     * @return mixed
     */
    public function parentMenusHasUser($roles = array())
    {
        return $menus = Menu::join('menus_has_roles as mhr', 'mhr.menu_id', '=', 'menus.id')
            ->leftJoin('map_urls as url', 'url.id', '=', 'menus.map_url_id')
            ->whereIn('rol_id', $roles)
            ->whereNull('parent_menu_id')
            ->groupBy('menus.id')
            ->orderBy('orden', 'asc')
            ->get(['menus.id', 'menus.name', 'url.route', 'url.function']);
    }

    public function childrenMenusByParent($parentId)
    {
        return Menu::where('parent_menu_id', $parentId)
            ->join('map_urls as url', 'url.id', '=', 'menus.map_url_id')
            ->groupBy('menus.id')
            ->orderBy('orden', 'asc')
            ->get(['menus.id', 'menus.name', 'url.route', 'url.function']);
    }
}