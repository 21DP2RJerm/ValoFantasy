<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Team;
use App\Models\Player;
use App\Models\fantasyTeam;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;



class ApiController extends Controller
{
    public function countsUsers(Request $request){
        $users = \App\Models\User::orderBy('name')->pluck('name'); // Fetch all user names
        return response()->json([
            "data" => $users->toArray(), // Convert collection to array
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

    public function fantasyTeam(Request $request){

        $request->validate([
            "player1" => "required",
            "player2" => "required",
            "player3" => "required",
            "player4" => "required",
            "player5" => "required",
            "user" => "required"
        ]);

        fantasyTeam::create([
            "player1" => $request ->player1,
            "player2" => $request ->player2,
            "player3" => $request ->player3,
            "player4" => $request ->player4,
            "player5" => $request ->player5,
            "user" => $request ->user
        ]);

        return response() ->json([
            "status" => true,
            "message" => "Fantasy Team has been created"
        ]);
    }


}
