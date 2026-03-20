<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tuteur extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'telephone',
        'fonction',
        'entreprise_id',
    ];

    public function entreprise()
    {
        return $this->belongsTo(Entreprise::class, 'entreprise_id');
    }

    public function stages()
    {
        return $this->hasMany(Stage::class, 'tuteur_id');
    }

    public function etudiants()
    {
        return $this->hasMany(Etudiant::class, 'tuteur_id');
    }
}