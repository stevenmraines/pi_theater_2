<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateShowGenresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('show_genres', function (Blueprint $table) {
            $table->increments('id');
			$table->unsignedInteger('show_id');
			$table->unsignedInteger('genre_id');
            $table->timestamp('created_at')->useCurrent();
			$table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
			$table->foreign('show_id')->references('id')->on('shows')->onDelete('cascade');
			$table->foreign('genre_id')->references('id')->on('genres')->onDelete('cascade');
			$table->unique(['show_id', 'genre_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('show_genres');
    }
}
