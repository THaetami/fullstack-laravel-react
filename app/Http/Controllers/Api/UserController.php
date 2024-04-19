<?php

namespace App\Http\Controllers\Api;

use App\Helpers\JsonResponseHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['store']]);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $user = new UserResource(Auth::user());
        return JsonResponseHelper::respondSuccess($user);
    }

    /**
     * @param  StoreUserRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);

        $user = User::create($data);

        if (!$user) {
            return JsonResponseHelper::respondFail("User gagal ditambahkan", 400);
        }

        return JsonResponseHelper::respondSuccess([
            "addedUser" => [
                "id" => $user->id,
                "name" => $user->name
            ]
        ], 201);
    }
}
