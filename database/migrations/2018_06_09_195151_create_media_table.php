<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMediaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('media', function (Blueprint $table) {
            $table->increments('id');
            $table->enum('media_type', ['movie', 'show']);
			$table->string('file_or_folder_name');
			$table->string('title');
			$table->string('summary', 4000);
            $table->string('notes')->nullable();
            $table->string('poster')->default('missing-poster.jpg');
            $table->unsignedInteger('year_start')->nullable()->default(null);
			$table->unsignedInteger('year_end')->nullable()->default(null);
            $table->timestamp('created_at')->useCurrent();
			$table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('media');
    }
}
