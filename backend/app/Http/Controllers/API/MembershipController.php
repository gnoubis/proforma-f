<?php

namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;
use App\Mail\UserVerification;
use App\Mail\PasswordVerification;
use Illuminate\Http\Request;
use App\Models\Membership;
use Illuminate\Support\Str;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Psy\Readline\Hoa\Console;

class MembershipController extends Controller
{



    public function index(Request $request)
    {
        $request->validate([
            'usermail' => 'required',
            'secretpwd' => 'required'
        ]);

            $membership = Membership::where('usermail',$request->usermail)->first();


            try{

                if(!$membership || md5($request->input('secretpwd')) != $membership->secretpwd)
                {

                    return response()->json([
                        'status'=>500,
                        'message'=> 'Adresse mail ou mot passe incorrecte',
                    ]);
                }
                else{

                    if($membership->userstatus==0)
                {
                    return response()->json([
                        'status' => 401,
                        'message'=> 'Veillez confirmer votre adresse mail pour vous connectez',
                    ]);
                }else if($membership->userstatus==1)
                {
                    return response()->json([
                        'status' => 200,
                        'message'=> 'Connexion effectuée avec succès',
                    ]);
                }
                }
            }catch(\Exception $err)
            {
                echo "message:".$err;
            }



        }

            public function passwordforget(Request $request)
            {

                $request->validate([
                    'email' => 'required',


                ]);

                $membership = Membership::where('usermail',$request->email)->first();

            if(!$membership)
            {
                return response()->json([
                    'status'=> 401,
                    'message'=> 'Adresse mail introuvable',
                ]);
            }else {
                Mail::mailer('smtp')->to($membership->usermail)->send(new PasswordVerification($membership));

                    return response()->json([
                        'status' => 200,
                        'message'=> 'Email envoyé avec succes!',
                    ],200);


                        // $membership->delete()

                        return response()->json([
                            'status' => 500,
                            'errors'=> 'le mail n\'a pas été envoyé, veillez réessayé!',
                        ],500);


            }
            }
            public function resetPassword(Request $request)
            {

            }

    public function confirm(Request $request)
    {
        $token = str::random(64);
        $membership = Membership::where('id', $request->id)->first();
        if($request->email == $membership->usermail)
        {
        $date = date('Y-m-d H:i:s');
        $membership->token = $token;
        $membership->email_verified_at = $date;
        $membership->userstatus = 1;
        $membership->save();

        return redirect("http://localhost:3000/confirmation-account");
        }




    }

    public function resetPasswordRedirect(Membership $membership){

                return redirect("http://localhost:3000/reset-password"."/".$membership->id);
    }


    public function store(Request $request){




        // $token =  $membership->createToken('Laravel Password Grant Client')->accessToken;
        // $response = ['token' => $token];

        // $request->validate([
        //     "useremail"  => "required|unique:membership",
        //     "password" => "required|min:6",
        // ]);

        $membership = new Membership;

        $type = ($request->input('companyname') ? 'company' : 'individual');
        $company = ($type === 'individual') ? $request->input('commercialname') : $request->input('companyname');

        $membership->usrtype = $type; //Required
        $membership->firstname = $request->input('firstname');
        $membership->lastname = $request->input('lastname'); //Required
        $membership->usermail = $request->input('useremail');
        $membership->mandatoryterms = $request->input('checked');
        $membership->secretpwd = md5($request->input('password'));
        $membership->companyname = $company;

        $save = $membership->save();

    $mail = Mail::mailer('smtp')->to($membership->usermail)->send(new UserVerification($membership));
    try{
        if(!$save )
    {
        return response()->json([
            'status' => 500,
            'message'=> 'le mail n\'a pas été envoyé, veillez réessayé!',
            'membership'=> $save
        ],500);
    }else{
        return response()->json([
            'status' => 200,
            'message'=> 'Enregistrement effectué avec succès',
            'membership'=> $save
        ],200);

    }
    }catch(\Exception $err)
        {
            echo "message:".$err;

            return response()->json([
                'status' => 500,
                'errors'=> 'le mail n\'a pas été envoyé, veillez réessayé!',
            ],500);
        }


    }

    protected function guard()
    {
        return Auth::guard('membership');
    }

    public function __construct()
    {
        $this->middleware('guest:membership')->except('logout');
    }

    public function logout (Request $request) {
        $token = $request->membership()->token();
        $token->revoke();
        $response = ['message' => 'Vous etes déconnectez avec succes!'];
        return response($response, 200);
    }
}
