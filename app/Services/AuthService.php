<?php

namespace App\Services;

use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;

class AuthService
{
    /**
     * @param array $credentials
     * @return array|null
     */
    public function attemptLogin(array $credentials)
    {
        if (!Auth::attempt($credentials)) {
            return null;
        }

        $user = new UserResource(Auth::user());
        $token = Auth::attempt($credentials);

        return compact('user', 'token');
    }
}
