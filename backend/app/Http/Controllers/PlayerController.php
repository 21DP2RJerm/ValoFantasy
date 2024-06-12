<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Player;
use Illuminate\Support\Facades\Log;

class PlayerController extends Controller
{
    public function getPlayerByInGameName(Request $request)
    {
        try {
            $inGameName = $request->query('in_game_name');
            $player = Player::where('in_game_name', $inGameName)->first();

            if (!$player) {
                return response()->json(['status' => false, 'message' => 'Player not found'], 404);
            }

            return response()->json(['status' => true, 'data' => $player]);
        } catch (\Exception $e) {
            Log::error('Error fetching player by in_game_name: ' . $e->getMessage());
            return response()->json(['status' => false, 'message' => 'Internal Server Error'], 500);
        }
    }
}