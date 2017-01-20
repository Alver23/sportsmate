<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UsersTableSeeder::class);
        $this->call(LanguagesTableSeeder::class);
        $this->call(MapUrlTableSeeder::class);
        $this->call(RolesTableSeeder::class);
        $this->call(MenuTableSeeder::class);
        $this->call(MenusHasRolesTableSeeder::class);
    }
}
