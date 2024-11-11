<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        //
        Schema::create('customer_documents', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('customer_id');
//            $table->foreign('customer_idr_id')->references('id')->on('customers');
            $table->tinyText('file_name');
            $table->text('description')->nullable();
            $table->tinyText('file_type')->nullable();
            $table->mediumInteger('file_size')->nullable();
            $table->text('file_path')->nullable();
            $table->boolean('is_folder')->default(0);
            $table->smallInteger('parent_id')->default(0);
            $table->integer('creator_id');
//            $table->foreign('creator_id')->references('id')->on('users');
            $table->boolean('is_favorite')->default(0);
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
