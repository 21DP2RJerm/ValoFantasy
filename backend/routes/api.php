<?php
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ApiController;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Http\Controllers\TeamController;
//Route::get('/user', function (Request $request) {
//    return $request->user();
//})->middleware('auth:sanctum');

// Open routes
Route::post("register", [ApiController::class, "register"]);

Route::post("/login",  [ApiController::class, "login"]);
Route::post("createPlayer", [ApiController::class, "createPlayer"]);
Route::post("createTeam", [ApiController::class, "createTeam"]);
Route::post("fantasyTeam", [ApiController::class, "fantasyTeam"]);
Route::post("countsUsers" ,[ApiController::class, "countsUsers"]);
Route::post('getTeamInfo', [TeamController::class, 'getTeamInfo']);
Route::post('getTeamPlayers', [TeamController::class, 'getTeamPlayers']);
Route::get('getTeamByName', [TeamController::class, 'getTeamByName']);

// Protected routes
Route::group([
    "middleware" => ["auth:api"]
], function(){

    Route::get("profile", [ApiController::class, "profile"]);
    Route::get("logout", [ApiController::class, "logout"]);
});