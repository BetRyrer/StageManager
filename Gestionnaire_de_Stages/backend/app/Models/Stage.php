<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stage extends Model
{
    use HasFactory;

    protected $fillable = [
        'etudiant_id',
        'entreprise_id',
        'tuteur_id',
        'date_debut',
        'date_fin',
        'interruption',
        'date_debut_interruption',
        'date_fin_interruption',
        'thematique',
        'sujet',
        'fonctions_taches',
        'detail_projet',
        'duree_stage',
        'nb_jours_travail',
        'nb_heures_hebdo',
        'gratification',
        'unite_gratification',
        'validation_administrative',
        'validation_pedagogique',
        'avenants',
        'date_creation_convention',
        'date_modification_convention',
        'annee_universitaire',
        'type_convention',
        'commentaire_stage',
        'commentaire_duree_travail',
        'code_elp',
        'element_pedagogique',
    ];

    // Relations
    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class, 'etudiant_id');
    }

    public function tuteur()
    {
        return $this->belongsTo(Tuteur::class, 'tuteur_id');
    }

    public function entreprise()
    {
        return $this->belongsTo(Entreprise::class, 'entreprise_id');
    }
}
