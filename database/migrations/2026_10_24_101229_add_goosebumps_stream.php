<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddGoosebumpsStream extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \DB::table('streams')->insert([
            'name' => 'Give Yourself Goosebumps',
            'menu_image' => 'stream-goosebumps.png',
            'timeline_image' => 'stream-goosebumps-text.png',
            'type' => 'show',
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        \DB::table('streams')->where('name', 'Give Yourself Goosebumps')->delete();
    }
}
