<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('fantasyTeams', function (Blueprint $table) {
            $table->id();
            $table->foreignId('player1')->constrained(
                table: 'players', indexName: 'id'
            );
            $table->foreignId('player2')->constrained(
                table: 'players', indexName: 'id'
            );
            $table->foreignId('player3')->constrained(
                table: 'players', indexName: 'id'
            );
            $table->foreignId('player4')->constrained(
                table: 'players', indexName: 'id'
            );
            $table->foreignId('player5')->constrained(
                table: 'players', indexName: 'id'
            );
            $table->foreign('user')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fantasyTeams');
    }
};