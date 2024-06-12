<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FantasyTeam extends Model
{
    use HasFactory;

    protected $fillable = [
        'player1',
        'player2',
        'player3',
        'player4',
        'player5',
        'user',
        'points',
    ];

    protected $casts = [
        'user' => 'integer',
    ];

    public function updatePoints()
    {
        $this->points = Player::whereIn('id', [
            $this->player1,
            $this->player2,
            $this->player3,
            $this->player4,
            $this->player5,
        ])->sum('points');

        $this->save();
    }
}
