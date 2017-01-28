<?php
/**
 * Created by PhpStorm.
 * User: agrisales
 * Date: 21/01/17
 * Time: 01:56 AM
 */

namespace SportsMate\Factories;


use SportsMate\Repositories\MenuRepository;

class MenuFactory
{


    public static function menusHasRol()
    {
        $menuRepository = new MenuRepository;
        $roles = self::roles();
        $dataMenus = $menuRepository->parentMenusHasUser($roles);
        $menus = $dataMenus->map(function ($item, $key) use ($menuRepository) {
            return (object) [
                'parent' => $item,
                'children' => $menuRepository->childrenMenusByParent($item->id),
            ];
        });
        return $menus;
    }

    public static function roles() {
        $user = \Auth::user();
        $allRoles = $user->roles()->get();
        $roles = $allRoles->map(function ($item, $key) {
            return $item->id;
        });
        return $roles;
    }
}