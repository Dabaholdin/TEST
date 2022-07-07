<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProvidersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('providers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('name_company');
            $table->integer('unscrupulous')->default(0);
            $table->string('email')->nullable();
            $table->string('website')->nullable();
            $table->string('phone')->nullable();
            $table->string('wechat')->nullable();
            $table->bigInteger('country_id')->nullable();
            $table->string('beneficiary_name');
            $table->string('beneficiary_account_name');
            $table->string('beneficiary_bank_address');
            $table->string('beneficiary_address');
            $table->string('beneficiary_bank_name');
            $table->string('beneficiary_bank_code');
            $table->string('beneficiary_swift_address');
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
        Schema::dropIfExists('providers');
    }
}
