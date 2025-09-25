<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tuteur extends Model
{
    use HasFactory;

    protected $fillable = ['nom', 'prenom', 'email', 'telephone', 'type', 'entreprise_id', 'user_id'];

    public function stages()
    {
        return $this->hasMany(Stage::class);
    }

    public function entreprise()
    {
        return $this->belongsTo(Entreprise::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

