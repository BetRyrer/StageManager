<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Exemple : création d'autres utilisateurs si tu veux
        // User::factory(10)->create();

        // Empêche les doublons & crée l'utilisateur de test si nécessaire
        User::updateOrCreate(
            ['email' => 'test@example.com'], // condition
            [
                'name' => 'Test User',
                'password' => bcrypt('password'),
            ]
        );
    }
}
