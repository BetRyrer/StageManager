<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('etudiant_tuteur_ecole', function (Blueprint $table) {
            $table->id();

            $table->foreignId('etudiant_id')
                  ->constrained('etudiants')
                  ->onDelete('cascade');

            $table->foreignId('tuteur_ecole_id')
                  ->constrained('tuteur_ecoles')
                  ->onDelete('cascade');

            $table->timestamps();

            $table->unique(['etudiant_id', 'tuteur_ecole_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('etudiant_tuteur_ecole');
    }
};

