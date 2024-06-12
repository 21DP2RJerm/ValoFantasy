<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StatTracker extends Model
{
    use HasFactory;

    protected $fillable = [
        'player',
        'kills',
        'deaths',
        'assists',
        'points',
    ];

    public function player()
    {
        return $this->belongsTo(Player::class, 'player');
    }

    protected static function booted()
    {
        static::created(function ($statTracker) {

            $totalPoints = StatTracker::where('player', $statTracker->player)->sum('points');

            $player = Player::find($statTracker->player);
            $player->points = $totalPoints;
            $player->save();


            FantasyTeam::where('player1', $player->id)
                ->orWhere('player2', $player->id)
                ->orWhere('player3', $player->id)
                ->orWhere('player4', $player->id)
                ->orWhere('player5', $player->id)
                ->each(function ($fantasyTeam) {
                    $fantasyTeam->updatePoints();
                });
        });
    }
}