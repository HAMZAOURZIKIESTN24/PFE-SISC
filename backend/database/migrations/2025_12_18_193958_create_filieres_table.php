<?php

// database/migrations/xxxx_xx_xx_create_filieres_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  public function up(): void {
    Schema::create('filieres', function (Blueprint $table) {
      $table->id();                 // filiere_id (PK)
      $table->string('nom')->unique();
      $table->text('description')->nullable();
      $table->timestamps();
    });
  }

  public function down(): void {
    Schema::dropIfExists('filieres');
  }
};
;
