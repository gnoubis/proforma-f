<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Membership extends Model
{
    use HasFactory;
    protected $table = 'membership';
    protected $fillable = [
        'firstname',
        'lastname',
        'usermail',
        'usrtype',
        'secretpawd',
        'companyname',
        'commerciallabel',
        'account_status',
        'phonenumber',
        'userstatus',
        'token',
    ];
}
