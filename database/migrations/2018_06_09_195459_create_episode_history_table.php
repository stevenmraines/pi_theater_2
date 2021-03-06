<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEpisodeHistoryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('episode_history', function (Blueprint $table) {
			$table->unsignedInteger('user_id');
			$table->unsignedInteger('episode_id');
			$table->unsignedInteger('progress')->default(0);
            $table->timestamp('created_at')->useCurrent();
			$table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
			$table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
			$table->foreign('episode_id')->references('id')->on('episodes')->onDelete('cascade');
			$table->unique(['user_id', 'episode_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('episode_history');
    }
}
