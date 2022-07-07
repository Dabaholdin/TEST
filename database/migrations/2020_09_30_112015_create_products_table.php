<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name_ru');
            $table->string('name_en')->nullable();
            $table->text('about_ru');
            $table->text('about_en')->nullable();
            $table->bigInteger('catalog_id')->nullable();
            $table->string('image')->nullable();
            $table->integer('price_rub');
            $table->integer('price_usd');
            $table->integer('price_cny');
            $table->integer('weight_netto');
            $table->integer('weight_brutto');
            $table->string('vendor_code');
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
        Schema::dropIfExists('products');
    }
}
