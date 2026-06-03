<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('soutenances', function (Blueprint $table) {
            $table->id();

            $table->foreignId('etudiant_id')
                  ->constrained('etudiants')
                  ->onDelete('cascade');

            $table->string('maitre_stage')->nullable();

            $table->foreignId('tuteur_id')
                  ->nullable()
                  ->constrained('users')
                  ->onDelete('set null');

            $table->date('date_soutenance');
            $table->time('heure_debut');
            $table->time('heure_fin');

            $table->string('salle')->nullable();
            $table->string('titre_stage')->nullable();

            $table->enum('statut', [
                'planifiee',
                'confirmee',
                'terminee',
                'annulee'
            ])->default('planifiee');

            $table->decimal('note', 4, 2)->nullable();
            $table->text('commentaire')->nullable();

            $table->timestamps();
            $table->softDeletes();

            $table->index(['date_soutenance', 'statut']);
            $table->index('etudiant_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('soutenances');
    }
};