<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class StatTrackerTable extends Migration
{
    public function up()
    {
        Schema::create('stat_trackers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('player');
            $table->integer('kills');
            $table->integer('deaths');
            $table->integer('assists');
            $table->integer('points');
            $table->timestamps();
            
            $table->foreign('player')->references('id')->on('players')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('stat_trackers');
    }
}
