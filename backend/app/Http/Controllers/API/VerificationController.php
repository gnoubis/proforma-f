<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class VerificationController extends Controller
{
    public function verify($user_id, Request $request)
    {
        if(!$request->hasValidSignature())
        {
            return response()->json(["msg" => "Invalid/Expired url provided"], 400);

        }

        $user = User::findOrFail($user_id);

        if (!$user->hasVerifiedEmail()){
                $user->markEmailAsVerified();

        }else{
            return response()->json([
                "status" => 400,
                "message" => "l'adresse existe deja veillez vérifier!"
            ],400);

        }

        return response()->json([
            'status' => 200,
            'message'=> "Votre email $user->email a ete vérifiée avec succes",
        ],200);

    }
}
