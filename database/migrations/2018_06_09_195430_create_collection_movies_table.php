<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCollectionMoviesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('collection_movies', function (Blueprint $table) {
            $table->increments('id');
			$table->unsignedInteger('collection_id');
			$table->unsignedInteger('movie_id');
            $table->timestamp('created_at')->useCurrent();
			$table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
			$table->foreign('collection_id')->references('id')->on('collections')->onDelete('cascade');
			$table->foreign('movie_id')->references('id')->on('movies')->onDelete('cascade');
			$table->unique(['collection_id', 'movie_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('collection_movies');
    }
}
