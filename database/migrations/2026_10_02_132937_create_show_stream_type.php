<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateShowStreamType extends Migration
{
    public function up()
    {
        \DB::statement("
            ALTER TABLE streams
            MODIFY COLUMN `type` ENUM('random', 'collection', 'show')
            NOT NULL DEFAULT 'random'
            AFTER day_end
        ");

        \DB::table('streams')->insert([
            'name' => 'Community',
            'type' => 'show',
        ]);
    }

    public function down()
    {
        \DB::table('streams')->where('name', 'Community')->where('type', 'show')->delete();

        \DB::statement("
            ALTER TABLE streams
            MODIFY COLUMN `type` ENUM('random', 'collection')
            NOT NULL DEFAULT 'random'
            AFTER day_end
        ");
    }
}
