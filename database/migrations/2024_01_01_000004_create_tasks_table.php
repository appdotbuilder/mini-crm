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
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->text('description');
            $table->date('due_date');
            $table->enum('status', ['To Do', 'In Progress', 'Completed'])->default('To Do');
            $table->string('related_type'); // 'contact' or 'deal'
            $table->unsignedBigInteger('related_id');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('status');
            $table->index('due_date');
            $table->index(['related_type', 'related_id']);
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};