<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;


class ApiController extends Controller
{
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
        //Data validation

        $request ->validate([
            "email" => "required|email",
            "password" => "required"
        ]);

        // Checking User login
        if(Auth::attempt([
            "email" => $request->email,
            "password" => $request->password,
        ])){
            //User exists
            $user = Auth::user();

            $token = $user->createToken("myToken")->accessToken;

            return response()->json([
                "status" =>true,
                "message" => "User logged in successfully",
                "token" => $token
            ]);

        }else{

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
}
