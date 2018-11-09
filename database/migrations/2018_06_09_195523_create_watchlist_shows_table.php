<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWatchlistShowsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('watchlist_shows', function (Blueprint $table) {
            $table->increments('id');
			$table->unsignedInteger('user_id');
			$table->unsignedInteger('movie_id');
            $table->timestamp('created_at')->useCurrent();
			$table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
			$table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
			$table->foreign('movie_id')->references('id')->on('movies')->onDelete('cascade');
			$table->unique(['user_id', 'movie_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('watchlist_shows');
    }
}
