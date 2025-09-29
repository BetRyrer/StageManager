<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('stages', function (Blueprint $table) {
            $table->id();
            
            // Relations
            $table->foreignId('entreprise_id')->constrained('entreprises')->onDelete('cascade');
            $table->foreignId('etudiant_id')->constrained('etudiants')->onDelete('cascade');
            $table->foreignId('tuteur_id')->nullable()->constrained('tuteurs')->nullOnDelete();

            // Données stage
            $table->date('date_debut')->nullable();
            $table->date('date_fin')->nullable();
            $table->boolean('interruption')->nullable();
            $table->date('date_debut_interruption')->nullable();
            $table->date('date_fin_interruption')->nullable();
            $table->string('thematique')->nullable();
            $table->text('sujet')->nullable();
            $table->text('fonctions_taches')->nullable();
            $table->text('detail_projet')->nullable();
            $table->string('duree_stage')->nullable();
            $table->integer('nb_jours_travail')->nullable();
            $table->integer('nb_heures_hebdo')->nullable();
            $table->string('gratification')->nullable();
            $table->string('unite_gratification')->nullable();
            $table->boolean('validation_administrative')->nullable();
            $table->boolean('validation_pedagogique')->nullable();
            $table->string('avenants')->nullable();
            $table->date('date_creation_convention')->nullable();
            $table->date('date_modification_convention')->nullable();
            $table->string('annee_universitaire')->nullable();
            $table->string('type_convention')->nullable();
            $table->text('commentaire_stage')->nullable();
            $table->text('commentaire_duree_travail')->nullable();
            $table->string('code_elp')->nullable();
            $table->string('element_pedagogique')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('stages');
    }
};
