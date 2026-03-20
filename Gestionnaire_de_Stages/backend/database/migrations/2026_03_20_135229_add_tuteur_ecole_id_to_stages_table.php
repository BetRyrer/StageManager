<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('stages', function (Blueprint $table) {
            $table->foreignId('tuteur_ecole_id')
                ->nullable()
                ->constrained('tuteur_ecoles')
                ->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('stages', function (Blueprint $table) {
            $table->dropForeign(['tuteur_ecole_id']);
            $table->dropColumn('tuteur_ecole_id');
        });
    }
};