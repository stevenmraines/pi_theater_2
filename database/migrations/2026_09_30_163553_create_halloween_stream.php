<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHalloweenStream extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $s1 = App\Stream::find(1)->menu_image = null;
        $s1->save();
        
        $s2 = App\Stream::find(2)->menu_image = null;
        $s2->save();
        
        
        App\Stream::create([
            'name' => 'Halloween Favorites',
            'menu_image' => 'menu-halloween.png',
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        App\Stream::where('name', 'Halloween Favorites')->delete();
    }
}
