<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Database\Eloquent\Model;

class fantasyTeam extends Model
{
    use HasFactory;

    protected $fillable = [
        'player1',
        'player2',
        'player3',
        'player4',
        'player5',
        'user'
    ];

    protected $casts = [
        'user' => 'integer', // Casting to integer for consistency, even though it's stored as bigInteger
    ];
}