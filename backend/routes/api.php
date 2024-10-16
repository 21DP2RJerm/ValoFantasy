<?php
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ApiController;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\StatTrackerController;
use App\Http\Controllers\PlayerController;
use App\Models\AuditLog;
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
Route::post('/stat_tracker', [ApiController::class, 'createStat']);
Route::get('/players', [PlayerController::class, 'getPlayerByInGameName']);
Route::post('/getFantasyTeamInfo', [ApiController::class, 'getFantasyTeamInfo']);
Route::get('/fantasyTeam/{userId}', [ApiController::class, 'getUserFantasyTeam']);
Route::post('getPlayerInfo', [ApiController::class, 'getPlayerInfo']);

// Protected routes
Route::group([
    "middleware" => ["auth:api"]
], function(){

    Route::get("profile", [ApiController::class, "profile"]);
    Route::get("logout", [ApiController::class, "logout"]);
});
Route::get('/audit-logs', function () {
    return AuditLog::all();
});