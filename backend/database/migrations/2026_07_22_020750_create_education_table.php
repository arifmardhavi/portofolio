<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('educations', function (Blueprint $table) { // Changed to educations to match laravel conventions
            $table->id();
            $table->string('institution_name');
            $table->string('institution_logo')->nullable();
            $table->string('institution_url')->nullable();
            $table->string('degree');
            $table->string('major');
            $table->string('score')->nullable(); // GPA etc
            $table->integer('start_year');
            $table->integer('end_year')->nullable();
            $table->string('location');
            $table->string('country_code')->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('educations');
    }
};
