<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Membership;
use Illuminate\Http\Request;

class VerificationController extends Controller
{

    public function verify($membership_id, Request $request)
    {
        if(!$request->hasValidSignature())
        {
            return response()->json(["msg" => "Invalid/Expired url provided"], 400);

        }

        $membership = Membership::findOrFail($membership_id);

        if (!$membership->hasVerifiedEmail()){
                $membership->markEmailAsVerified();

        }else{
            return response()->json([
                "status" => 400,
                "message" => "l'adresse existe deja veillez vérifier!"
            ],400);

        }

        return response()->json([
            'status' => 200,
            'message'=> "Votre email $membership->useremail a ete vérifiée avec succes",
        ],200);

    }
}
