<?php

//use App\Http\Controllers\AuthController;
use App\Http\Controllers\API\MembershipController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
/*
Route::prefix(prefix: "auth")->group(function() {
    Route::controller(controller: AuthController::class)->group(function() {
        Route::post("register", action:"register");
        Route::post("login", action:"login");
        Route::get("init", action:"init");

        Route::get('/dashboard-data', 'Api\HomeController@getData');
    });
});
*/

// Route::group(['middleware' => ['auth:api'], 'prefix' => 'v1'], function () {
//     Route::get('/lead/list', 'Api\LeadController@listData');
//     Route::post('/lead/create', 'Api\LeadController@create');
//     Route::post('/lead/update', 'Api\LeadController@update');
//     Route::post('/lead/destroy', 'Api\LeadController@destroy');

//     Route::get('/dashboard-data', 'Api\HomeController@getData');
// });

Route::post('/add-member', [MembershipController::class, 'store']);
Route::post('/login-member', [MembershipController::class, 'index']);
Route::post('/passwordforget', [MembershipController::class, 'passwordforget']);
// Route::get('email/verify/{id}', [\App\Http\Controllers::class,'verify'])->name('verification.verify');
