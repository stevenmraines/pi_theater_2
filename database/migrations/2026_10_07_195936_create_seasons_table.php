<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSeasonsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('seasons', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('media_id');
            $table->string('name')->nullable()->default(NULL);
            $table->unsignedInteger('number')->default(0);
            $table->timestamp('created_at')->useCurrent();
			$table->timestamp('updated_at')->default(\DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
            $table->foreign('media_id')->references('id')->on('media')->onDelete('cascade');
            $table->unique(['media_id', 'name', 'number']);
        });

        $seasons = \DB::table('episodes')
            ->select([\DB::raw('DISTINCT season AS `number`'), 'media_id'])
            ->orderBy('media_id', 'asc')
            ->orderBy('season', 'asc')
            ->get();
        
        foreach ($seasons as $season) {
            \DB::table('seasons')
                ->insert([
                    'media_id' => $season->media_id,
                    'number' => $season->number,
                ]);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('seasons');
    }
}
