<?php

namespace App\Http\Controllers\Api;

use App\Helpers\JsonResponseHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Resources\UserResource;
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

        $user = new UserResource(Auth::user());
        $token = Auth::attempt($credentials);

        return JsonResponseHelper::respondSuccess(compact('user', 'token'));
        // ->cookie('token', $token, 60, null, null, false, true);
    }

    public function logout()
    {
        auth()->logout();
        return response()->json(['message' => 'Successfully logged out'])->cookie('token', null, -1);
    }

    public function refresh()
    {
        $token = Auth::refresh();

        return JsonResponseHelper::respondSuccess(compact('token'));
        // ->cookie('token', $token, 60, null, null, false, true);
    }
}
