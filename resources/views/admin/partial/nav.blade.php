@php
/**
 * Created by PhpStorm.
 * User: agrisales
 * Date: 13/01/17
 * Time: 06:23 PM
 */
@endphp
<ul class="sidebar-menu">
    <li class="header">MAIN NAVIGATION</li>
    @foreach($menus as $menu)
        @php
        $icon = $class = null;
        if (count($menu->children) > 0) {
            $class = 'class="treeview"';
            $icon = '<i class="fa fa-angle-left pull-right"></i>';
        }
        @endphp
        <li {{ $class }}>
            <a href="javascript:;">
                <span>
                    {{ $menu->parent->name }}
                    {!! $icon !!}
                </span>
            </a>
            <ul class="treeview-menu">
                @foreach($menu->children as $children)
                    <li>
                        <a href="javascript:;">
                            <span>
                                {{ $children->name }}
                            </span>
                        </a>
                    </li>
                @endforeach
            </ul>
        </li>
    @endforeach
</ul>