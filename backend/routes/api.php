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

Route::middleware(['throttle:60,1'])->group(function () {
    Route::post("register", [ApiController::class, "register"]);

    Route::post("/login",  [ApiController::class, "login"]);
    Route::post("createPlayer", [ApiController::class, "createPlayer"]);
    Route::post("createTeam", [ApiController::class, "createTeam"]);
    Route::post("fantasyTeam", [ApiController::class, "fantasyTeam"]);
    Route::post('getTeamInfo', [TeamController::class, 'getTeamInfo']);
    Route::post('getTeamPlayers', [TeamController::class, 'getTeamPlayers']);
    Route::get('getTeamByName', [TeamController::class, 'getTeamByName']);
    Route::post('/stat_tracker', [ApiController::class, 'createStat']);
    Route::get('/players', [PlayerController::class, 'getPlayerByInGameName']);
    Route::post('/getFantasyTeamInfo', [ApiController::class, 'getFantasyTeamInfo']);
    Route::get('/fantasyTeam/{userId}', [ApiController::class, 'getUserFantasyTeam']);
    Route::post('getPlayerInfo', [ApiController::class, 'getPlayerInfo']);
    Route::post("countsUsers" ,[ApiController::class, "countsUsers"]);
});
Route::middleware(['throttle:100,1'])->group(function () {
    Route::group([
        "middleware" => ["auth:api"]
    ], function(){

        Route::get("profile", [ApiController::class, "profile"]);
        Route::get("logout", [ApiController::class, "logout"]);
    });
    Route::get('/csrf-token', function () {
        return response()->json(['csrf_token' => csrf_token()]);
    });
});
Route::get('/audit-logs', function () {
    return AuditLog::all();
});