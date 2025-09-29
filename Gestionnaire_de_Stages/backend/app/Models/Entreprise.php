<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Entreprise extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'siret',
        'adresse',
        'code_postal',
        'commune',
        'pays',
        'statut_juridique',
        'type_structure',
        'effectif',
        'code_naf',
        'telephone',
        'mail',
        'site_web',
        'service_nom',
        'service_adresse',
        'service_code_postal',
        'service_commune',
        'service_pays',
    ];

    // Relations
    public function stages()
    {
        return $this->hasMany(Stage::class, 'entreprise_id');
    }

    public function tuteurs()
    {
        return $this->hasMany(Tuteur::class, 'entreprise_id');
    }
}
