<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Team;
use App\Models\Player;

class TeamController extends Controller
{
    public function getTeamInfo(Request $request)
    {
        try {
            $teams = Team::all();
            return response()->json(['data' => $teams], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch team data'], 500);
        }
    }

    public function getTeamPlayers(Request $request)
    {
        try {
            $teamId = $request->input('teamId');
            $players = Player::where('team', $teamId)->get();
            return response()->json(['players' => $players], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch players data'], 500);
        }
    }
}