<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\MembershipController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('confirm/{id}/{email}', [MembershipController::class, 'confirm']);

Route::get('reset-password/{id}/{email}', function(){
    return redirect("http://localhost:3000/reset-password");
});
