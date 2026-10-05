<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddStreamsTimelineImageColumn extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('streams', function (Blueprint $table) {
            $table->string('timeline_image')->after('menu_image')->nullable()->default(NULL);
        });

        \DB::table('streams')->where('id', 1)->update(['timeline_image' => 'stream-novel-graphics-text.png']);
        \DB::table('streams')->where('id', 2)->update(['timeline_image' => 'stream-fright-vision-text.png']);
        \DB::table('streams')->where('id', 3)->update(['timeline_image' => 'stream-spooky-season-text.png']);
        \DB::table('streams')->where('id', 4)->update(['timeline_image' => 'stream-greendale-cctv-text.png']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('streams', function (Blueprint $table) {
            $table->dropColumn('timeline_image');
        });
    }
}
