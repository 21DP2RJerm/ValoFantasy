<?php

namespace App\Http\Controllers\Api;
use App\Models\AuditLog;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Player;
use App\Models\fantasyTeam;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\Team;
use Illuminate\Support\Facades\Log;
use App\Models\statTracker;


class ApiController extends Controller
{   
    public function getTeamInfo(Request $request){
        $teams = \App\Models\Team::all()->pluck('name'); 
        return response()->json([
            "data" => $teams->toArray(), 
        ]);
    }
    public function getPlayerInfo(Request $request){
        $teams = \App\Models\Player::all(); 
        return response()->json([
            "data" => $teams->toArray(), 
        ]);
    }
    public function getFantasyTeamInfo(Request $request){
        $teams = \App\Models\fantasyTeam::all(); 
        return response()->json([
            "data" => $teams->toArray(), 
        ]);
    }
    public function countsUsers(Request $request){
        $users = \App\Models\User::select('users.id', 'users.name', 'fantasy_teams.points')
            ->leftJoin('fantasy_teams', 'users.id', '=', 'fantasy_teams.user')
            ->orderBy('fantasy_teams.points', 'desc')
            ->get(); 
    
        return response()->json([
            "data" => $users->toArray(), 
        ]);
    }
    
    public function register(Request $request){
       
        $request->validate([
            "name" => "required",
            "email" => "required|email|unique:users",
            "password" => "required|confirmed",
        ]);
    
        
        $user = User::create([
            "name" => $request->name,
            "email" => $request->email,
            "password" => Hash::make($request->password),
            "admin" => false,
        ]);
    
        
        AuditLog::create([
            'user_id' => $user->id,
            'action' => 'register',
            'description' => 'New user registered: ' . $user->name,
            'ip_address' => $request->ip(),
        ]);
    
        return response()->json([
            "status" => true,
            "message" => "User created successfully"
        ]);
    }

    public function login(Request $request)
{
    
    $request->validate([
        "name" => "required|string",
        "password" => "required"
    ]);

    
    if (Auth::attempt([
        "name" => $request->name,
        "password" => $request->password,
    ])) {
        
        $user = Auth::user();
        $token = $user->createToken("myToken")->accessToken;


        AuditLog::create([
            'user_id' => $user->id,
            'action' => 'login',
            'description' => 'User logged in: ' . $user->name,
            'ip_address' => $request->ip(),
        ]);

        return response()->json([
            "status" => true,
            "message" => "User logged in successfully",
            "token" => $token
        ]);
    } else {
        return response()->json([
            "status" => false,
            "message" => "Invalid login details"
        ]);
    }
}

    // Profile Api (POST)
    public function profile(){
                
        $user = Auth::user();

        return response()->json([
            "status" => true,
            "message" => "Profile information",
            "data" => $user
        ]);
    }

    // Logout Api (POST)
    public function logout(Request $request){
        
        auth()->user()->token()->revoke();

        return response()->json([
            "status" => true,
            "messages" => "User logged out"
        ]);
    }

    public function createPlayer(Request $request){
        
        // Data validation
        $request->validate([
            "name" => "required",
            "last_name" => "required",
            "in_game_name" => "required",
            "team" => "required"
        ]);
        
        //Create player

        Player::create([
            "name" => $request->name,
            "last_name" => $request->last_name,
            "in_game_name" => $request->in_game_name,
            "team" => $request->team,
            "points" => 0
        ]);

        return response() -> json([
            "status" => true,
            "message" => "Player created succesfully"
        ]);



    }

    public function createTeam(Request $request){

        $request->validate([
            "name"=>"required",
            "region" => "required"
        ]);

        Team::create([
            "name" => $request->name,
            "region" => $request->region
        ]);

        return response() ->json([
            "status" => true,
            "message" => "Team has been created"
        ]);
    }

    public function fantasyTeam(Request $request)
{
    $request->validate([
        "player1" => "required|string",
        "player2" => "required|string",
        "player3" => "required|string",
        "player4" => "required|string",
        "player5" => "required|string",
        "user" => "required|numeric",
    ]);

    Log::info('Received data:', $request->all());

    // Check if the user already has a team
    $existingTeam = fantasyTeam::where('user', $request->user)->first();
    if ($existingTeam) {
        return response()->json([
            "status" => false,
            "message" => "User already has a fantasy team."
        ], 400);
    }

    $players = [
        'player1' => Player::where('in_game_name', $request->player1)->first(),
        'player2' => Player::where('in_game_name', $request->player2)->first(),
        'player3' => Player::where('in_game_name', $request->player3)->first(),
        'player4' => Player::where('in_game_name', $request->player4)->first(),
        'player5' => Player::where('in_game_name', $request->player5)->first(),
    ];

    $foundPlayers = array_filter($players, function ($player) {
        return $player !== null;
    });

    if (count($foundPlayers) !== 5) {
        return response()->json([
            "status" => false,
            "message" => "One or more players not found."
        ], 404);
    }

    fantasyTeam::create([
        "player1" => $foundPlayers['player1']->id,
        "player2" => $foundPlayers['player2']->id,
        "player3" => $foundPlayers['player3']->id,
        "player4" => $foundPlayers['player4']->id,
        "player5" => $foundPlayers['player5']->id,
        "user" => $request->user,
        "points" => 0
    ]);

    return response()->json([
        "status" => true,
        "message" => "Fantasy Team has been created"
    ]);
}
public function getUserFantasyTeam($userId)
{
    $team = FantasyTeam::where('user', $userId)->first();

    if ($team) {
        $teamData = [
            'player1' => $team->player1 ? Player::find($team->player1)->in_game_name : null,
            'player2' => $team->player2 ? Player::find($team->player2)->in_game_name : null,
            'player3' => $team->player3 ? Player::find($team->player3)->in_game_name : null,
            'player4' => $team->player4 ? Player::find($team->player4)->in_game_name : null,
            'player5' => $team->player5 ? Player::find($team->player5)->in_game_name : null,
        ];

        return response()->json([
            "status" => true,
            "team" => $teamData
        ]);
    } else {
        return response()->json([
            "status" => false,
            "team" => null
        ]);
    }
}
public function createStat(Request $request)
{
    try {
        $request->validate([
            'player' => 'required|numeric|exists:players,id',
            'kills' => 'required|integer|min:0',
            'deaths' => 'required|integer|min:0',
            'assists' => 'required|integer|min:0'
        ]);

        $points = ($request->kills * 3) - ($request->deaths * 2) + $request->assists;

        StatTracker::create([
            'player' => $request->player,
            'kills' => $request->kills,
            'deaths' => $request->deaths,
            'assists' => $request->assists,
            'points' => $points
        ]);

        $totalPoints = StatTracker::where('player', $request->player)->sum('points');
        $player = Player::find($request->player);
        $player->points = $totalPoints;
        $player->save();

        return response()->json(['status' => true, 'message' => 'Statistics saved successfully']);
    } catch (\Exception $e) {
        Log::error('Error creating statTracker: ' . $e->getMessage());
        Log::error($e->getTraceAsString());
        return response()->json(['status' => false, 'message' => 'Internal Server Error'], 500);
    }
}

    
}
