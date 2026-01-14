<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TuteurEcole extends Model
{
    protected $table = 'tuteur_ecoles';

    protected $fillable = [
        'nom',
        'prenom',
    ];

    public function etudiants()
    {
        return $this->belongsToMany(
            Etudiant::class,
            'etudiant_tuteur_ecole',
            'tuteur_ecole_id',
            'etudiant_id'
        );
    }
}
