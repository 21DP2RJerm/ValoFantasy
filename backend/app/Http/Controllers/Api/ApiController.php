<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

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
        
    }

    // Profile Api (POST)
    public function profile(){
        
    }

    // Logout Api (POST)
    public function logout(Request $request){
        
    }
}
