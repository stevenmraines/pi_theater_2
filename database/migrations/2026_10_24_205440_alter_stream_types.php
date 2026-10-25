<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterStreamTypes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Add the genre option
        \DB::statement("
            ALTER TABLE streams
            MODIFY COLUMN `type` ENUM('random', 'collection', 'show', 'genre')
            NOT NULL DEFAULT 'genre'
            AFTER day_end
        ");

        // Change random to genre
        \DB::table('streams')->where('type', 'random')->update(['type' => 'genre']);

        // Remove random option
        \DB::statement("
            ALTER TABLE streams
            MODIFY COLUMN `type` ENUM('collection', 'genre', 'show')
            NOT NULL DEFAULT 'genre'
            AFTER day_end
        ");

        Schema::table('streams', function (Blueprint $table) {
            $table->unsignedInteger('collection_id')->nullable()->default(NULL)->after('type');
            $table->unsignedInteger('genre_id')->nullable()->default(NULL)->after('collection_id');
            $table->unsignedInteger('media_id')->nullable()->default(NULL)->after('genre_id');
            $table->foreign('collection_id')->references('id')->on('collections');
            $table->foreign('genre_id')->references('id')->on('genres');
            $table->foreign('media_id')->references('id')->on('media');
        });

        \DB::table('streams')->where('id', 1)->update(['genre_id' => 23]);
        \DB::table('streams')->where('id', 2)->update(['genre_id' => 13]);
        \DB::table('streams')->where('id', 3)->update(['collection_id' => 6]);
        \DB::table('streams')->where('id', 4)->update(['media_id' => 290]);
        \DB::table('streams')->where('id', 5)->update(['media_id' => 492]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('streams', function (Blueprint $table) {
            $table->dropColumn('collection_id');
            $table->dropColumn('genre_id');
            $table->dropColumn('media_id');
        });

        // Add back random option
        \DB::statement("
            ALTER TABLE streams
            MODIFY COLUMN `type` ENUM('random', 'collection', 'show', 'genre')
            NOT NULL DEFAULT 'random'
            AFTER day_end
        ");

        // Change genre to random
        \DB::table('streams')->where('type', 'genre')->update(['type' => 'random']);

        // Remove genre option
        \DB::statement("
            ALTER TABLE streams
            MODIFY COLUMN `type` ENUM('collection', 'show', 'random')
            NOT NULL DEFAULT 'random'
            AFTER day_end
        ");
    }
}
