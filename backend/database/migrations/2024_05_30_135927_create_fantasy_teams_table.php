<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFantasyTeamsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fantasy_teams', function (Blueprint $table) {
            $table->id();
            // Assuming the players and users tables have an auto-incrementing ID column
            $table->unsignedBigInteger('player1')->nullable();
            $table->unsignedBigInteger('player2')->nullable();
            $table->unsignedBigInteger('player3')->nullable();
            $table->unsignedBigInteger('player4')->nullable();
            $table->unsignedBigInteger('player5')->nullable();
            $table->unsignedBigInteger('user')->nullable();
            $table->timestamps();

            // Foreign key constraints
            $table->foreign('player1')->references('id')->on('players');
            $table->foreign('player2')->references('id')->on('players');
            $table->foreign('player3')->references('id')->on('players');
            $table->foreign('player4')->references('id')->on('players');
            $table->foreign('player5')->references('id')->on('players');
            $table->foreign('user')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('fantasy_teams');
    }
}
