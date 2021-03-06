<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;

class MenuTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('menus')->insert([
            [
                'id' => 1,
                'parent_menu_id' => null,
                'map_url_id' => null,
                'uuid' => Uuid::generate(4),
                'name' => 'Settings',
                'orden' => 1,
                'owner_user_id' => 1,
                'owner_user_id' => 1,
                'ip_address' => '127.0.0.1',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'id' => 2,
                'parent_menu_id' => null,
                'map_url_id' => 1,
                'uuid' => Uuid::generate(4),
                'name' => 'Users',
                'orden' => 2,
                'owner_user_id' => 1,
                'owner_user_id' => 1,
                'ip_address' => '127.0.0.1',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'id' => 3,
                'parent_menu_id' => null,
                'map_url_id' => 2,
                'uuid' => Uuid::generate(4),
                'name' => 'Uniforms',
                'orden' => 3,
                'owner_user_id' => 1,
                'owner_user_id' => 1,
                'ip_address' => '127.0.0.1',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'id' => 4,
                'parent_menu_id' => null,
                'map_url_id' => 3,
                'uuid' => Uuid::generate(4),
                'name' => 'Teams',
                'orden' => 4,
                'owner_user_id' => 1,
                'owner_user_id' => 1,
                'ip_address' => '127.0.0.1',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'id' => 5,
                'parent_menu_id' => null,
                'map_url_id' => 4,
                'uuid' => Uuid::generate(4),
                'name' => 'Leagues',
                'orden' => 5,
                'owner_user_id' => 1,
                'owner_user_id' => 1,
                'ip_address' => '127.0.0.1',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'id' => 6,
                'parent_menu_id' => 1,
                'map_url_id' => 5,
                'uuid' => Uuid::generate(4),
                'name' => 'Organizations',
                'orden' => 1,
                'owner_user_id' => 1,
                'owner_user_id' => 1,
                'ip_address' => '127.0.0.1',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'id' => 7,
                'parent_menu_id' => 1,
                'map_url_id' => 6,
                'uuid' => Uuid::generate(4),
                'name' => 'Type Members',
                'orden' => 2,
                'owner_user_id' => 1,
                'owner_user_id' => 1,
                'ip_address' => '127.0.0.1',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'id' => 8,
                'parent_menu_id' => 1,
                'map_url_id' => 7,
                'uuid' => Uuid::generate(4),
                'name' => 'Positions',
                'orden' => 3,
                'owner_user_id' => 1,
                'owner_user_id' => 1,
                'ip_address' => '127.0.0.1',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'id' => 9,
                'parent_menu_id' => 1,
                'map_url_id' => 8,
                'uuid' => Uuid::generate(4),
                'name' => 'Categories',
                'orden' => 4,
                'owner_user_id' => 1,
                'owner_user_id' => 1,
                'ip_address' => '127.0.0.1',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'id' => 10,
                'parent_menu_id' => 1,
                'map_url_id' => 9,
                'uuid' => Uuid::generate(4),
                'name' => 'Permissions',
                'orden' => 5,
                'owner_user_id' => 1,
                'owner_user_id' => 1,
                'ip_address' => '127.0.0.1',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'id' => 11,
                'parent_menu_id' => 1,
                'map_url_id' => 10,
                'uuid' => Uuid::generate(4),
                'name' => 'Roles',
                'orden' => 6,
                'owner_user_id' => 1,
                'owner_user_id' => 1,
                'ip_address' => '127.0.0.1',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]
        ]);
    }
}
