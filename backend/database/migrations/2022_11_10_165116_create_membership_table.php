<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('membership', function (Blueprint $table) {
            $table->id();
            $table->string('firstname');
            $table->string('lastname');
            $table->string('phonenumber')->nullable()->unique();
            $table->string('usermail')->unique();
            $table->date('borndate')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('secretpwd');
            $table->string('refusr')->nullable();
            $table->string('addresslocation')->nullable();
            $table->string('postalcode')->nullable();
            $table->string('companyname');
            $table->string('usrtype');
            $table->string('city')->nullable();
            $table->string('country')->nullable();
            $table->string('referralcode')->nullable();
            $table->string('fromsource')->nullable();
            $table->string('token')->nullable();
            $table->integer('userstatus')->default(0);
            $table->integer('mandatoryterms')->default(0);
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('membership');
    }
};
