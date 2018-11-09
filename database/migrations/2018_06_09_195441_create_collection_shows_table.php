<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCollectionShowsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('collection_shows', function (Blueprint $table) {
            $table->increments('id');
			$table->unsignedInteger('collection_id');
			$table->unsignedInteger('show_id');
            $table->timestamp('created_at')->useCurrent();
			$table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
			$table->foreign('collection_id')->references('id')->on('collections')->onDelete('cascade');
			$table->foreign('show_id')->references('id')->on('shows')->onDelete('cascade');
			$table->unique(['collection_id', 'show_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('collection_shows');
    }
}
