<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDevicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('devices', function (Blueprint $table) {
            $table->id();
            $table->string('name')->index();
            $table->string('imei')->unique()->index();
            $table->string('address')->nullable();
            $table->decimal('lat', 10,8)->index();
            $table->decimal('lng', 11, 8)->index();
            $table->unsignedBigInteger('created_by')->nullable()->index();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('created_by')
                ->on('users')
                ->references('id')
                ->cascadeOnUpdate()
                ->nullOnDelete();

            $table->index(['id', 'name', 'imei', 'lat', 'lng'], 'google_maps_index');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('devices');
    }
}
