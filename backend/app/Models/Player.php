<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'last_name',
        'in_game_name',
        'team',
        'points',
    ];

    public function team()
    {
        return $this->belongsTo(Team::class, 'team');
    }

    public function stats()
    {
        return $this->hasMany(statTracker::class, 'player');
    }
}

