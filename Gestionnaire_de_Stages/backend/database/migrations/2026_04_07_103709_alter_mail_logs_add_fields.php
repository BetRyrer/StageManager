<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
public function up(): void
{
    Schema::table('mail_logs', function (Blueprint $table) {
        // Ajoute uniquement les colonnes manquantes
        if (!Schema::hasColumn('mail_logs', 'subject')) {
            $table->string('subject')->nullable()->after('email');
        }
        if (!Schema::hasColumn('mail_logs', 'body_snapshot')) {
            $table->text('body_snapshot')->nullable()->after('subject');
        }
        if (!Schema::hasColumn('mail_logs', 'cc')) {
            $table->json('cc')->nullable()->after('body_snapshot');
        }
        if (!Schema::hasColumn('mail_logs', 'status')) {
            $table->enum('status', ['pending', 'sent', 'failed'])->default('pending')->after('cc');
        }
        if (!Schema::hasColumn('mail_logs', 'retry_count')) {
            $table->unsignedTinyInteger('retry_count')->default(0)->after('status');
        }
        if (!Schema::hasColumn('mail_logs', 'error_message')) {
            $table->text('error_message')->nullable()->after('retry_count');
        }
    });
}

public function down(): void
{
    Schema::table('mail_logs', function (Blueprint $table) {
        $table->dropColumn(['subject', 'body_snapshot', 'cc', 'status', 'retry_count', 'error_message']);
    });
}
};
