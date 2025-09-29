<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('etudiants', function (Blueprint $table) {
            $table->id();
            $table->string('num_etudiant')->unique();
            $table->string('nom')->nullable();
            $table->string('prenom')->nullable();
            $table->string('mail_perso')->nullable();
            $table->string('mail_universitaire')->nullable();
            $table->string('tel_perso')->nullable();
            $table->string('tel_portable')->nullable();
            $table->string('code_ufr')->nullable();
            $table->string('libelle_ufr')->nullable();
            $table->string('code_departement')->nullable();
            $table->string('code_etape')->nullable();
            $table->string('libelle_etape')->nullable();
            $table->string('code_sexe')->nullable();
            $table->string('adresse')->nullable();
            $table->string('code_postal')->nullable();
            $table->string('ville')->nullable();
            $table->string('pays')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('etudiants');
    }
};





