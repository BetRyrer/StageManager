<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Ajouter email si absent
            if (!Schema::hasColumn('users', 'email')) {
                $table->string('email')->unique()->after('id');
            }

            // Ajouter password si absent
            if (!Schema::hasColumn('users', 'password')) {
                $table->string('password')->after('email');
            }

            // Ajouter api_token si absent
            if (!Schema::hasColumn('users', 'api_token')) {
                $table->string('api_token', 80)->unique()->nullable()->after('password');
            }

            // Supprimer name si existant
            if (Schema::hasColumn('users', 'name')) {
                $table->dropColumn('name');
            }
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['email', 'password', 'api_token']);
            $table->string('name')->nullable();
        });
    }
};
