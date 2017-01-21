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
    @if($menus)
        @foreach($menus as $menu)
            @php
                $icon = $class = null;
                $url = 'javascript:;';
                if (count($menu->children) > 0) {
                    $class = 'class="treeview"';
                    $icon = '<i class="fa fa-angle-left pull-right"></i>';
                    $url = 'javascript:;';
                } else {
                    $url = route($menu->parent->route . '.' . $menu->parent->function);
                }
            @endphp
            <li {{ $class }}>
                <a href="{{ $url }}">
                    <span>
                        {{ $menu->parent->name }}
                        {!! $icon !!}
                    </span>
                </a>
                @if(count($menu->children) > 0)
                    <ul class="treeview-menu">
                        @foreach($menu->children as $children)
                            @php
                            $urlChildren = route($children->route. '.' . $children->function)
                            @endphp
                            <li>
                                <a href="{{ $urlChildren }}">
                                    <span>
                                        {{ $children->name }}
                                    </span>
                                </a>
                            </li>
                        @endforeach
                    </ul>
                @endif
            </li>
        @endforeach
    @endif
</ul>