<?php
// database/migrations/xxxx_xx_xx_create_modules_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  public function up(): void {
    Schema::create('modules', function (Blueprint $table) {
      $table->id();  // module_id (PK)

      $table->foreignId('filiere_id')
        ->constrained('filieres')
        ->cascadeOnDelete();

      $table->string('nom');
      $table->string('semestre'); // "S1", "S2", "S3", "S4"
      $table->timestamps();

      // Optional: avoid duplicates in same filiere + semestre
      $table->unique(['filiere_id', 'semestre', 'nom']);
    });
  }

  public function down(): void {
    Schema::dropIfExists('modules');
  }
};
