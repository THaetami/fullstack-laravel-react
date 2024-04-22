<?php

namespace App\Http\Controllers\Api;

use App\Helpers\JsonResponseHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Services\AuthService;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->middleware('auth:api', ['except' => ['login']]);
        $this->authService = $authService;
    }


    /**
     * @param  LoginRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        $authData = $this->authService->attemptLogin($credentials);

        if (!$authData) {
            return JsonResponseHelper::respondFail('Provided email address or password is incorrect', 422);
        }

        return JsonResponseHelper::respondSuccess($authData)
            ->cookie('token', $authData['token'], 60, null, null, false, true);
    }


    /**
     * @return \Illuminate\Http\Response
     */
    public function logout()
    {
        auth()->logout();
        return response()->json(['message' => 'Successfully logged out'])->cookie('token', null, -1);
    }


    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        $token = Auth::refresh();

        return JsonResponseHelper::respondSuccess(compact('token'))
            ->cookie('token', $token, 60, null, null, false, true);
    }
}
