<?php

namespace App\Imports;

use App\Models\Stage;
use App\Models\Etudiant;
use App\Models\Entreprise;
use App\Models\Tuteur;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithCustomCsvSettings;

class StagesImport implements ToModel, WithHeadingRow, WithCustomCsvSettings
{
    private function parseDate($value)
    {
        if (!$value || strtolower($value) === 'null') {
            return null;
        }

        try {
            return \Carbon\Carbon::createFromFormat('d/m/Y', $value)->format('Y-m-d');
        } catch (\Exception $e) {
            return null;
        }
    }

    public function getCsvSettings(): array
    {
        return [
            'delimiter' => ';',
        ];
    }

    public function model(array $row)
    {
        // === Étudiant ===
        $etudiant = Etudiant::firstOrCreate(
            ['num_etudiant' => $row['n_etudiant']],
            [
                'nom'            => explode(' ', $row['etudiant_nom_prenom'])[0] ?? 'Inconnu',
                'prenom'         => explode(' ', $row['etudiant_nom_prenom'])[1] ?? '',
                'mail_perso'     => $row['mail_perso_etudiant'] ?? null,
                'mail_universitaire' => $row['mail_universitaire_etudiant'] ?? null,
                'tel_perso'      => $row['telephone_perso_etudiant'] ?? null,
                'tel_portable'   => $row['telephone_portable_etudiant'] ?? null,
                'code_ufr'       => $row['code_ufr'] ?? null,
                'libelle_ufr'    => $row['libelle_ufr'] ?? null,
                'code_etape'     => $row['code_etape'] ?? null,
                'libelle_etape'  => $row['libelle_etape'] ?? null,
                'annee'          => $row['annee_universitaire'] ?? null,
                'code_departement' => $row['code_departement'] ?? null,
                'code_sexe'        => $row['code_sexe_etudiant'] ?? null,
                'adresse'          => $row['adresse_etudiant'] ?? null,
                'code_postal'      => $row['code_postal_etudiant'] ?? null,
                'ville'            => $row['ville_etudiant'] ?? null,
                'pays'             => $row['pays_etudiant'] ?? null,
            ]
        );

        // === Entreprise ===
        $siret = preg_replace('/\D/', '', (string) ($row['siret'] ?? ''));

        $entreprise = Entreprise::firstOrCreate(
            ['siret' => $siret],
            [
                'nom'            => $row['nom_structure_daccueil'] ?? 'Entreprise inconnue',
                'raison_sociale' => $row['raison_sociale'] ?? 'Entreprise inconnue',
                'adresse'        => $row['adresse'] ?? null,
                'code_postal'    => $row['code_postal'] ?? null,
                'commune'        => $row['commune'] ?? null,
                'pays'           => $row['pays'] ?? 'FR',
                'statut_juridique' => $row['statut_juridique'] ?? null,
                'type_structure'   => $row['type_de_structure'] ?? null,
                'effectif'         => $row['effectif'] ?? null,
                'code_naf'         => $row['code_naf'] ?? null,
                'telephone'        => $row['telephone'] ?? null,
                'mail'             => $row['mail'] ?? null,
                'site_web'         => $row['site_web'] ?? null,
                'service_nom'      => $row['service_daccueil_nom'] ?? null,
                'service_adresse'  => $row['service_daccueil_adresse'] ?? null,
                'service_code_postal' => $row['service_daccueil_code_postal'] ?? null,
                'service_commune'  => $row['service_daccueil_commune'] ?? null,
                'service_pays'     => $row['service_daccueil_pays'] ?? null,
            ]
        );

        // === Tuteur ===
        $tuteur = null;
        if (!empty($row['tuteur_professionnel_nom_prenom'])) {
            $parts = explode(' ', $row['tuteur_professionnel_nom_prenom'], 2);

            $tuteur = Tuteur::firstOrCreate(
                [
                    'email'        => $row['mail_tuteur_professionnel'] ?? null,
                    'entreprise_id'=> $entreprise->id,
                ],
                [
                    'nom'       => $parts[0] ?? null,
                    'prenom'    => $parts[1] ?? null,
                    'telephone' => $row['telephone_tuteur_professionnel'] ?? null,
                    'fonction'  => $row['fonction_tuteur_professionnel'] ?? null,
                ]
            );
        }

        // === Stage ===
        return new Stage([
            'etudiant_id'  => $etudiant->id,
            'entreprise_id'=> $entreprise->id,
            'tuteur_id'    => $tuteur?->id,
            'date_debut'   => $this->parseDate($row['date_debut_du_stage'] ?? null),
            'date_fin'     => $this->parseDate($row['date_fin_du_stage'] ?? null),
            'sujet'        => $row['sujet'] ?? 'Stage sans sujet',
            'thematique'   => $row['thematique'] ?? null,
            'fonctions_taches' => $row['fonctions_et_taches'] ?? null,
            'detail_projet'=> $row['detail_du_projet'] ?? null,
            'duree_stage'  => $row['duree_du_stage'] ?? null,
            'nb_heures_hebdo' => $row['nbre_dheures_hebdomadaire'] ?? null,
            'gratification'   => $row['gratification'] ?? null,
            'unite_gratification' => $row['unite_duree_gratification'] ?? null,
        ]);
    }
}
