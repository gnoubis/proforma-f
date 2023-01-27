<?php

namespace App\Http\Controllers;

use App\Mail\VerificationMail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{

    // public function __construct()
    // {
    //     $this->middleware('auth:api')->except('login');

    // }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);
        $user = User::where('email',$request->email)->first();
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        if($user->userstatus==0){
            return response()->json([
                'status' => 401,
                'message'=> 'Veillez confirmer votre adresse mail pour vous connectez',
            ]);
        } else if($user->userstatus==1)
        {
            if (! $token = auth()->attempt($validator->validated())) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
            return $this->createNewToken($token);

        }

    }

            public function resetPassword(Request $request)
            {
                $validator = Validator::make($request->all(), [
                        'old_password' => 'required|string|min:6',
                        'new_password' => 'required|string|min:6',
                        'email' => 'required|email'
                ]);

                $user = User::where('email', $request->email)->first();
                $old_password = Hash::make($request->old_password);

                if( $user->password == $old_password ){
                        $user->password = Hash::make($request->new_password);
                        $user->save();

                        return response()->json([
                            'message' => 'mot de passe changé avec succes',
                            'status' => 200
                        ], 200);
                }else{
                    return response()->json([
                        'message' => 'votre mot de passe est incorrect, vous ne pouvez le changé',
                        'status' => 401,
                        'user' => $user->password,
                        'new_password' => $old_password
                    ], 401);

                }
            }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'firstname' => 'required|string|between:2,100',
            'lastname' => 'required|string|between:2,100',
            'usrtype' => 'required',
             'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|min:6',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
        $user = User::create(array_merge(
                    $validator->validated(),
                    ['password' => Hash::make($request->password)]
                ));
    $mail = Mail::mailer('smtp')->to($user->email)->send(new VerificationMail($user));

        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user,
            'status' => 201
        ], 201);
    }

    public function logout()
    {
        auth()->logout();
        return response()->json(['message' => 'utilisateur deconnecte avec succes']);
    }

    public function refresh(){
        return $this->createNewToken(auth()->refresh());
    }

    public function userProfile()
    {
        return response()->json(auth()->user());
    }
    public function userProfilePass()
    {
        return response()->json(auth()->user());
    }

    public function confirm(Request $request)
    {
        $user = User::where('id', $request->id)->first();
        if($request->email == $user->email)
        {
        $date = date('Y-m-d H:i:s');
        $user->email_verified_at = $date;
        $user->userstatus = 1;
        $user->save();

        return redirect("http://localhost:3000/confirmation-account");
        }




    }

    protected function createNewToken($token){

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => strtotime(date('y-m-d H:i:s', strtotime("+60 min"))),
            'user' => auth()->user()
        ]);
    }
}
