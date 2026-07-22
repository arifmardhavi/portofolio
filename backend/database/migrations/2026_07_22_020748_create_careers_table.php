<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('careers', function (Blueprint $table) {
            $table->id();
            $table->string('company_name');
            $table->string('company_logo')->nullable();
            $table->string('company_url')->nullable();
            $table->string('role');
            $table->string('location');
            $table->string('country_code')->nullable(); // For flag
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->string('status'); // Internship, Contract, Fulltime, Part-time
            $table->string('work_model'); // Onsite, Remote, Hybrid
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('careers');
    }
};
