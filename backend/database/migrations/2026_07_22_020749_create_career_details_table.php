<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('career_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('career_id')->constrained()->cascadeOnDelete();
            $table->json('responsibilities')->nullable();
            $table->json('what_i_learned')->nullable();
            $table->json('impact')->nullable();
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('career_details');
    }
};
