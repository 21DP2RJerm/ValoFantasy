<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Player;
use App\Models\fantasyTeam;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\Team;



class ApiController extends Controller
{   
    public function getTeamInfo(Request $request){
        $teams = \App\Models\Team::all()->pluck('name'); 
        return response()->json([
            "data" => $teams->toArray(), 
        ]);
    }
    public function countsUsers(Request $request){
        $users = \App\Models\User::orderBy('name')->pluck('name'); 
        return response()->json([
            "data" => $users->toArray(), 
        ]);
    }
    // Register Api (POST)
    public function register(Request $request){
        
        // Data validation
        $request->validate([
            "name" => "required",
            "email" => "required|email|unique:users",
            "password" => "required|confirmed",
        ]);
        
        //Create user

        User::create([
            "name" => $request->name,
            "email" => $request->email,
            "password" => Hash::make($request->password)
        ]);

        return response() -> json([
            "status" => true,
            "message" => "User created succesfully"
        ]);



    }

    // Login Api (POST)
    public function login(Request $request){
        // Data validation
        $request->validate([
            "name" => "required|string",
            "password" => "required"
        ]);
    
        // Checking User login
        if(Auth::attempt([
            "name" => $request->name,
            "password" => $request->password,
        ])){
            // User exists
            $user = Auth::user();
            $token = $user->createToken("myToken")->accessToken;
    
            return response()->json([
                "status" => true,
                "message" => "User logged in successfully",
                "token" => $token
            ]);
        } else {
            return response()->json([
                "status" => false,
                "messages" => "Invalid login details"
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
            "country" => "required|",
            "achievments" => "required|",
            "team" => "required|"
        ]);
        
        //Create player

        Player::create([
            "name" => $request->name,
            "country" => $request->country,
            "achievments" => $request->achievments,
            "team" => $request->team,
        ]);

        return response() -> json([
            "status" => true,
            "message" => "Player created succesfully"
        ]);



    }

    public function createTeam(Request $request){

        $request->validate([
            "name"=>"required",
            "country" => "required"
        ]);

        Team::create([
            "name" => $request->name,
            "country" => $request->country
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
        ]);

        $players = [
            'player1' => Player::where('name', $request->player1)->first(),
            'player2' => Player::where('name', $request->player2)->first(),
            'player3' => Player::where('name', $request->player3)->first(),
            'player4' => Player::where('name', $request->player4)->first(),
            'player5' => Player::where('name', $request->player5)->first(),
        ];

        $foundPlayers = array_filter($players, function ($player) {
            return $player!== null;
        });

        if (count($foundPlayers)!== 5) {
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
        ]);

        return response()->json([
            "status" => true,
            "message" => "Fantasy Team has been created"
        ]);
    }


}
