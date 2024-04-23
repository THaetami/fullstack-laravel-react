<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::controller(UserController::class)->group(function () {
    Route::get('user', 'index');
    Route::post('user', 'store');
    Route::put('user', 'update');
    Route::post('user/upload', 'uploadProfile');
});

Route::controller(AuthController::class)->group(function () {
    Route::post('auth', 'login');
    Route::delete('auth', 'logout');
    Route::get('refresh', 'refresh');
});
