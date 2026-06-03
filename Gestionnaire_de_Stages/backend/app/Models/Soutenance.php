<?php

namespace App\Models;

use App\Models\Etudiant;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Carbon\Carbon;

class Soutenance extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'etudiant_id',
        'maitre_stage',
        'tuteur_id',
        'date_soutenance',
        'heure_debut',
        'heure_fin',
        'salle',
        'titre_stage',
        'statut',
        'note',
        'commentaire',
    ];

    protected $casts = [
        'date_soutenance' => 'date',
        'note' => 'float',
    ];

    public function etudiant(): BelongsTo
    {
        return $this->belongsTo(Etudiant::class, 'etudiant_id');
    }

    public function tuteur(): BelongsTo
    {
        return $this->belongsTo(User::class, 'tuteur_id');
    }

    public function scopeParSemaine($query, Carbon $lundi): mixed
    {
        $vendredi = $lundi->copy()->addDays(4);

        return $query->whereBetween('date_soutenance', [
            $lundi->toDateString(),
            $vendredi->toDateString(),
        ]);
    }

    public function scopeAnneeScolaire($query, int $annee): mixed
    {
        return $query->whereBetween('date_soutenance', [
            Carbon::create($annee, 9, 1)->toDateString(),
            Carbon::create($annee + 1, 8, 31)->toDateString(),
        ]);
    }

    public function scopeActives($query): mixed
    {
        return $query->whereNotIn('statut', ['annulee']);
    }

    public function getStatutLabelAttribute(): string
    {
        return match ($this->statut) {
            'planifiee' => 'Planifiée',
            'confirmee' => 'Confirmée',
            'terminee' => 'Terminée',
            'annulee' => 'Annulée',
            default => ucfirst($this->statut),
        };
    }

    public function getDureeMinutesAttribute(): int
    {
        return Carbon::parse($this->heure_debut)
            ->diffInMinutes(Carbon::parse($this->heure_fin));
    }
}