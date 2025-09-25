<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stage extends Model
{
    use HasFactory;

    protected $fillable = ['titre', 'description', 'date_debut', 'date_fin', 'entreprise_id', 'etudiant_id', 'tuteur_id'];

    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class);
    }

    public function entreprise()
    {
        return $this->belongsTo(Entreprise::class);
    }

    public function tuteur()
    {
        return $this->belongsTo(Tuteur::class);
    }
}
