<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Entreprise extends Model
{
    use HasFactory;

    protected $fillable = ['nom', 'secteur', 'adresse', 'ville', 'site_web'];

    public function stages()
    {
        return $this->hasMany(Stage::class, 'entreprise_id');
    }

    public function tuteurs()
    {
        return $this->hasMany(Tuteur::class, 'entreprise_id');
    }
}
