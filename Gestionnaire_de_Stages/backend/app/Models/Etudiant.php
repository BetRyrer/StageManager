<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Etudiant extends Model
{
    use HasFactory;

    protected $fillable = ['nom', 'prenom', 'email', 'filiere', 'annee'];

    // Un étudiant a un seul stage
    public function stage()
    {
        return $this->hasOne(Stage::class, 'etudiant_id');
    }
}
