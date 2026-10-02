<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStreamsStartAndEndColumns extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('streams', function (Blueprint $table) {
            $table->unsignedInteger('month_start')->after('menu_image')->nullable()->default(NULL);
            $table->unsignedInteger('day_start')->after('month_start')->nullable()->default(NULL);
            $table->unsignedInteger('month_end')->after('day_start')->nullable()->default(NULL);
            $table->unsignedInteger('day_end')->after('month_end')->nullable()->default(NULL);
            $table->enum('type', ['random', 'collection'])->after('day_end')->default('random');
        });

        \DB::table('streams')->where('id', 3)->update([
            'month_start' => 10,
            'day_start'   => 1,
            'month_end'   => 10,
            'day_end'     => 31,
            'type'        => 'collection',
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('streams', function (Blueprint $table) {
            $table->dropColumn('month_start');
            $table->dropColumn('day_start');
            $table->dropColumn('month_end');
            $table->dropColumn('day_end');
            $table->dropColumn('type');
        });
    }
}
