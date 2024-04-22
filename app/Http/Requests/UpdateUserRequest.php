<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        $user = auth()->user();

        $rules = [
            'name' => 'required|string|max:14|min:4|regex:/^[a-zA-Z ]*$/',
        ];

        if ($this->input('email') != '' && $this->input('email') != $user->email) {
            $rules['email'] = 'required|unique:users|email:rfc,dns';
        }

        if ($this->input('password') != '') {
            $rules['password'] = [
                'required',
                'confirmed',
                'min:6',
                'regex:/^[a-zA-Z0-9]*$/',
            ];
        }

        return $rules;
    }
}
