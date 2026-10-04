<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddStreamMenuImages extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \DB::table('streams')
            ->where('id', 1)
            ->update(['menu_image' => 'stream-novel-graphics.png', 'name' => 'Novel Graphics']);
        
        \DB::table('streams')
            ->where('id', 2)
            ->update(['menu_image' => 'stream-fright-vision.png', 'name' => 'Fright Vision']);
        
        \DB::table('streams')
            ->where('id', 3)
            ->update(['menu_image' => 'stream-spooky-season.png', 'name' => 'Spooky Season']);
        
        \DB::table('streams')
            ->where('id', 4)
            ->update(['menu_image' => 'stream-greendale-cctv.png', 'name' => 'Greendale CCTV']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        \DB::table('streams')
            ->where('id', 1)
            ->update(['menu_image' => NULL, 'name' => 'Novel Graphix']);
        
        \DB::table('streams')
            ->where('id', 2)
            ->update(['menu_image' => NULL, 'name' => 'FrightVision']);
        
        \DB::table('streams')
            ->where('id', 3)
            ->update(['menu_image' => 'menu-halloween.png', 'name' => 'Halloween Favorites']);
        
        \DB::table('streams')
            ->where('id', 4)
            ->update(['menu_image' => 'stream-community.png', 'name' => 'Community']);
    }
}
