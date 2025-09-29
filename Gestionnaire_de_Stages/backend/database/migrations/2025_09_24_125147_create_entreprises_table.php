<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('entreprises', function (Blueprint $table) {
            $table->id();
            $table->string('nom')->nullable(); // Nom de la structure d’accueil
            $table->string('siret')->unique();
            $table->string('raison_sociale')->nullable();
            $table->string('adresse')->nullable();
            $table->string('code_postal')->nullable();
            $table->string('commune')->nullable();
            $table->string('pays')->default('FR');
            $table->string('statut_juridique')->nullable();
            $table->string('type_structure')->nullable();
            $table->string('effectif')->nullable();
            $table->string('code_naf')->nullable();
            $table->string('telephone')->nullable();
            $table->string('mail')->nullable();
            $table->string('site_web')->nullable();

            // Service d’accueil
            $table->string('service_nom')->nullable();
            $table->string('service_adresse')->nullable();
            $table->string('service_code_postal')->nullable();
            $table->string('service_commune')->nullable();
            $table->string('service_pays')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('entreprises');
    }
};
