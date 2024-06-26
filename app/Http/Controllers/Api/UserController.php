<?php

namespace App\Http\Controllers\Api;

use App\Helpers\JsonResponseHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Requests\UploadImageUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class UserController extends Controller
{
    private $userService;

    public function __construct(UserService $userService)
    {
        $this->middleware('auth:api', ['except' => ['store']]);
        $this->userService = $userService;
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
        try {
            $user = $this->userService->createUser($data);
            return JsonResponseHelper::respondSuccess([
                "addedUser" => [
                    "id" => $user->id,
                    "name" => $user->name
                ]
            ], 201);
        } catch (\Exception $e) {
            return JsonResponseHelper::respondFail($e->getMessage(), 400);
        }
    }


    /**
     * @param  UpdateUserRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateUserRequest $request)
    {
        $user = auth()->user();
        $validatedData = $request->validated();

        $updatedUser = $this->userService->updateUser($user, $validatedData);

        return JsonResponseHelper::respondSuccess([
            "updatedUser" => [
                "id" => $updatedUser->id,
                "name" => $updatedUser->name,
            ]
        ], 201);
    }


    public function uploadProfile(UploadImageUserRequest $request)
    {
        $request->validated();

        $file = $request->file('profile');

        $newImageName = $this->userService->upload($file, auth()->user()->id);

        if (!$newImageName) {
            return response()->json(['status' => 0, 'msg' => 'Failed to upload image']);
        }

        $user = User::find(auth()->user()->id);
        $user->image = $newImageName;
        $user->save();

        return JsonResponseHelper::respondSuccess("Your profile picture updated", 201);
    }
}
