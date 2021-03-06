<?php

use Illuminate\Database\Seeder;

class LanguagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('languages')->insert([
            [
                'name' => 'Español',
                'code' => 'ES',
            ],
            [
                'name' => 'Ingles',
                'code' => 'EN',
            ],
            [
                'name' => 'Portugues',
                'code' => 'PT',
            ]
        ]);
    }
}
