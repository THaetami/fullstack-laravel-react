<?php

namespace App\Http\Controllers\Api;

use App\Helpers\JsonResponseHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['store']]);
    }

    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);

        $user = User::create($data);

        if ($user) {
            return JsonResponseHelper::respondSuccess([
                "addedUser" => [
                    "id" => $user->id,
                    "email" => $user->email
                ]
            ], 201);
        } else {
            return JsonResponseHelper::respondFail("user gagal ditambahkan", 400);
        }
    }
}
