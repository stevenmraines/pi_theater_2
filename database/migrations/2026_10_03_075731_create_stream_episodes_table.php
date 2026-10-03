<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStreamEpisodesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stream_episodes', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('stream_id');
            $table->unsignedInteger('episode_id');
            $table->date('date');
            $table->timestamp('created_at')->useCurrent();
			$table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
			$table->foreign('stream_id')->references('id')->on('streams')->onDelete('cascade');
			$table->foreign('episode_id')->references('id')->on('episodes')->onDelete('cascade');
        });

        \DB::table('streams')
            ->where('id', 4)
            ->update(['menu_image' => 'stream-community.png']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('stream_episodes');

        \DB::table('streams')
            ->where('id', 4)
            ->update(['menu_image' => NULL]);
    }
}
