<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSeasonIdColumnToEpisodesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('episodes', function (Blueprint $table) {
            $table->unsignedInteger('season_id')->nullable()->after('season');
        });

        \DB::statement("
            UPDATE episodes AS e
            INNER JOIN seasons AS s
                ON e.media_id = s.media_id
            AND e.season = s.number
            SET e.season_id = s.id
        ");

        Schema::table('episodes', function (Blueprint $table) {
            $table->foreign('season_id')->references('id')->on('seasons');
            $table->unique(['media_id', 'season_id', 'episode_number']);
        });

        Schema::table('episodes', function (Blueprint $table) {
            // Need to drop the old unique index before we can drop the old column
            $table->dropUnique(['media_id', 'season', 'episode_number']);
            $table->dropColumn('season');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('episodes', function (Blueprint $table) {
            $table->unsignedInteger('season')->default(0)->after('media_id');
        });

        \DB::statement("
            UPDATE episodes AS e
            INNER JOIN seasons AS s ON e.season_id = s.id
            SET e.season = s.number
        ");

        Schema::table('episodes', function (Blueprint $table) {
            $table->unsignedInteger('season')->default(null)->change();
            $table->unique(['media_id', 'season', 'episode_number']);
        });

        Schema::table('episodes', function (Blueprint $table) {
            $table->dropUnique(['media_id', 'season_id', 'episode_number']);
            $table->dropForeign(['season_id']);
            $table->dropColumn('season_id');
        });
    }
}
