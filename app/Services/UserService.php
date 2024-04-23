<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserService
{
    /**
     * @param array $data
     * @return \App\Models\User
     * @throws \Exception
     */
    public function createUser(array $data)
    {
        $data['password'] = Hash::make($data['password']);
        $user = User::create($data);
        if (!$user) {
            throw new \Exception("User gagal ditambahkan");
        }
        return $user;
    }


    /**
     * @param \App\Models\User $user
     * @param array $data
     * @return \App\Models\User
     */
    public function updateUser($user, array $data)
    {
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        User::where('id', $user->id)->update($data);

        return $user->fresh();
    }


    public function upload($file, $userId)
    {
        $dest = 'storage/upload/';
        $newImageName = 'UIMG' . date('YmdHis') . uniqid() . '.jpg';

        $move = $file->move(public_path($dest), $newImageName);

        if (!$move) {
            return null;
        }

        $this->deletePreviousImage($userId, $dest);

        return $newImageName;
    }

    private function deletePreviousImage($userId, $dest)
    {
        $userInfo = User::where('id', $userId)->pluck('image')->first();

        if ($userInfo != '') {
            unlink($dest . $userInfo);
        }
    }
}
