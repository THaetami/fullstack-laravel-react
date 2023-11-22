<?php

namespace App\Http\Controllers\Api;

use App\Helpers\JsonResponseHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)) {
            return JsonResponseHelper::respondFail("Provided email address or password is incorrect", 422);
        }

        /** @var User $user */
        $user = Auth::user();
        $token = Auth::attempt($credentials);

        // return response(compact('user', 'token'))->cookie('token', $token, 60, null, null, false, true);
        return JsonResponseHelper::respondSuccess(compact('user', 'token'))->cookie('token', $token, 60, null, null, false, true);
    }

    public function logout()
    {
        auth()->logout();
        return response()->json(['message' => 'Successfully logged out'])->cookie('token', null, -1);
    }
}
