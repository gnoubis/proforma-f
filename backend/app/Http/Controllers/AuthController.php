<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register (Request $request) {
        $request->validate([
            "usermail"  => "required|unique:users",
            "secretpwd" => "required|min:6",
        ]);

        $user = User::create(array_merge($request->all(), ["secretpwd"=>Hash::make($request->secretpwd)]));

        $token = $user->createToken("token");

        return ["token" => $token->plainTextToken];
    }

    public function login (Request $request) {
        if(!auth()->attempt($request->all())){
            return response()->json(["message" => "INVALID_CREDENTIALS"], status: 401);
        }

        $user = auth()->user();
        $token = $user->createToken(name: "token");

        return ["token" => $token->plainTextToken];
    }

    public function init (Request $request) {
        $user = null;

        if(auth()->guard(name: "sanctum")->check()){
            $param = 'column: "id", auth()->guard(name: "sanctum")->id()';
            $user = User::with(relations: "membership")->where($param)->first();
        }

        return ["user" => $user];
    }
}
