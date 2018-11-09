<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateShowsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shows', function (Blueprint $table) {
            $table->increments('id');
			$table->string('title');
			$table->string('summary', 4000);
			$table->string('notes')->nullable();
			$table->unsignedInteger('year_start')->default(0);
			$table->unsignedInteger('year_end')->default(0);
			$table->string('poster')->default('missing-poster.jpg');
			$table->string('folder');
			$table->string('drive')->default('hdd1');
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
        Schema::dropIfExists('shows');
    }
}
