<?php

namespace App\Imports;

use App\Models\Stage;
use App\Models\Etudiant;
use App\Models\Entreprise;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class StagesImport implements ToModel, WithHeadingRow
{

    public function model(array $row)
    {
        
        // Créer ou récupérer l’étudiant
        $etudiant = Etudiant::firstOrCreate(
            ['email' => $row['etudiant_email']],
            [
                'nom'     => $row['etudiant_nom'] ?? 'Inconnu',
                'prenom'  => $row['etudiant_prenom'] ?? '',
                'tel'     => $row['etudiant_tel'] ?? '',
                'regime'  => $row['etudiant_regime'] ?? '',
                'filiere' => $row['filiere'] ?? '',
                'annee'   => $row['annee'] ?? '',
            ]
        );

        // Créer ou récupérer l’entreprise
            $siret = preg_replace('/\D/', '', (string) ($row['siret'] ?? ''));

            // Créer ou récupérer l’entreprise
            $entreprise = Entreprise::firstOrCreate(
                ['siret' => $siret],
                [
                    'raison_sociale' => $row['raison_sociale'] ?? 'Entreprise inconnue',
                    'adresse'        => $row['adresse_lieu'] ?? null,
                    'adresse2'       => $row['adresse2_lieu'] ?? null,
                    'code_postal'    => $row['code_postal'] ?? null, 
                    'ville'          => $row['ville'] ?? null,      
                    'pays'           => $row['pays'] ?? 'FR',
                ]
            );



        // Créer le stage
        return new Stage([
            'titre'         => $row['libelle'] ?? 'Stage sans titre',
            'date_debut'    => $row['date_debut'] ?? null,
            'date_fin'      => $row['date_fin'] ?? null,
            'entreprise_id' => $entreprise->id,
            'etudiant_id'   => $etudiant->id,
        ]);
    }
}
