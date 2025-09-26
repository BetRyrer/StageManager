<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Entreprise extends Model
{
    use HasFactory;

    protected $fillable = [
        'siret',
        'raison_sociale',
        'adresse',
        'adresse2',
        'code_postal',
        'ville',
        'pays',
    ];

    public function stages()
    {
        return $this->hasMany(Stage::class, 'entreprise_id');
    }

    public function tuteurs()
    {
        return $this->hasMany(Tuteur::class, 'entreprise_id');
    }
}
