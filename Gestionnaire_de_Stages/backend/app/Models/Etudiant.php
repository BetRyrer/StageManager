<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Etudiant extends Model
{
    use HasFactory;

    protected $fillable = [
        'num_etudiant',
        'nom',
        'prenom',
        'mail_perso',
        'mail_universitaire',
        'tel_perso',
        'tel_portable',
        'code_ufr',
        'libelle_ufr',
        'code_departement',
        'code_etape',
        'libelle_etape',
        'code_sexe',
        'adresse',
        'code_postal',
        'ville',
        'pays',
    ];


    // Un étudiant a un seul stage
    public function stage()
    {
        return $this->hasOne(Stage::class, 'etudiant_id');
    }
}
