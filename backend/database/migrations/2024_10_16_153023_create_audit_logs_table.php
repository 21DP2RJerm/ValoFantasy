<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAuditLogsTable extends Migration
{
    public function up()
    {
        Schema::create('audit_logs', function (Blueprint $table) {
            $table->id();
            $table->string('user_id')->nullable(); // ID of the user (if applicable)
            $table->string('action'); // The action being logged, e.g., 'login', 'register'
            $table->text('description')->nullable(); // Description or additional info
            $table->string('ip_address')->nullable(); // IP address of the user
            $table->timestamps(); // Log timestamps
        });
    }

    public function down()
    {
        Schema::dropIfExists('audit_logs');
    }
};
