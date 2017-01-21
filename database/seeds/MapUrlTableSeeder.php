<?php

use Carbon\Carbon;
use Webpatser\Uuid\Uuid;
use Illuminate\Database\Seeder;

class MapUrlTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('map_urls')->insert([
            [
                'id' => 1,
                'uuid' => Uuid::generate(4),
                'url' => 'users',
                'route' => 'users',
                'owner_user_id' => 1,
                'owner_user_id' => 1,
                'ip_address' => '127.0.0.1',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'id' => 2,
                'uuid' => Uuid::generate(4),
                'url' => 'uniforms',
                'route' => 'uniforms',
                'owner_user_id' => 1,
                'owner_user_id' => 1,
                'ip_address' => '127.0.0.1',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'id' => 3,
                'uuid' => Uuid::generate(4),
                'url' => 'teams',
                'route' => 'teams',
                'owner_user_id' => 1,
                'owner_user_id' => 1,
                'ip_address' => '127.0.0.1',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'id' => 4,
                'uuid' => Uuid::generate(4),
                'url' => 'leagues',
                'route' => 'leagues',
                'owner_user_id' => 1,
                'owner_user_id' => 1,
                'ip_address' => '127.0.0.1',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'id' => 5,
                'uuid' => Uuid::generate(4),
                'url' => 'organizations',
                'route' => 'organizations',
                'owner_user_id' => 1,
                'owner_user_id' => 1,
                'ip_address' => '127.0.0.1',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'id' => 6,
                'uuid' => Uuid::generate(4),
                'url' => 'type-members',
                'route' => 'type-members',
                'owner_user_id' => 1,
                'owner_user_id' => 1,
                'ip_address' => '127.0.0.1',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'id' => 7,
                'uuid' => Uuid::generate(4),
                'url' => 'positions',
                'route' => 'positions',
                'owner_user_id' => 1,
                'owner_user_id' => 1,
                'ip_address' => '127.0.0.1',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'id' => 8,
                'uuid' => Uuid::generate(4),
                'url' => 'categories',
                'route' => 'categories',
                'owner_user_id' => 1,
                'owner_user_id' => 1,
                'ip_address' => '127.0.0.1',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'id' => 9,
                'uuid' => Uuid::generate(4),
                'url' => 'permissions',
                'route' => 'permissions',
                'owner_user_id' => 1,
                'owner_user_id' => 1,
                'ip_address' => '127.0.0.1',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'id' => 10,
                'uuid' => Uuid::generate(4),
                'url' => 'roles',
                'route' => 'roles',
                'owner_user_id' => 1,
                'owner_user_id' => 1,
                'ip_address' => '127.0.0.1',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]
        ]);
    }
}
