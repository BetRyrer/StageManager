<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Soutenance;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Carbon\Carbon;

class SoutenanceController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Soutenance::with([
                'etudiant:id,nom,prenom,mail_universitaire',
                'tuteur:id,name'
            ])
            ->actives()
            ->orderBy('date_soutenance')
            ->orderBy('heure_debut');

        if ($request->filled('semaine')) {
            $lundi = Carbon::parse($request->semaine)
                ->startOfWeek(Carbon::MONDAY);

            $query->parSemaine($lundi);
        }

        if ($request->filled('annee_scolaire')) {
            $query->anneeScolaire((int) $request->annee_scolaire);
        }

        $soutenances = $query
            ->get()
            ->map(fn ($s) => $this->formatSoutenance($s));

        return response()->json([
            'data' => $soutenances,
            'total' => $soutenances->count(),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'etudiant_id' => ['required', 'exists:etudiants,id'],
            'date_soutenance' => ['required', 'date', 'after_or_equal:2025-09-01'],
            'heure_debut' => ['required', 'date_format:H:i'],
            'heure_fin' => ['required', 'date_format:H:i', 'after:heure_debut'],
            'salle' => ['nullable', 'string', 'max:100'],
            'titre_stage' => ['nullable', 'string', 'max:255'],
            'maitre_stage' => ['nullable', 'string', 'max:255'],
            'tuteur_id' => ['nullable', 'exists:users,id'],
        ]);

        $jour = Carbon::parse($validated['date_soutenance'])->dayOfWeek;

        if ($jour === Carbon::SATURDAY || $jour === Carbon::SUNDAY) {
            return response()->json([
                'message' => 'La soutenance ne peut pas être planifiée un week-end.',
            ], 422);
        }

        $dejaUneSoutenance = Soutenance::where('etudiant_id', $validated['etudiant_id'])
            ->where('statut', '!=', 'annulee')
            ->exists();

        if ($dejaUneSoutenance) {
            return response()->json([
                'message' => 'Cet étudiant possède déjà une soutenance.',
            ], 409);
        }

        if (!empty($validated['salle'])) {
            $conflitSalle = Soutenance::where('date_soutenance', $validated['date_soutenance'])
                ->where('salle', $validated['salle'])
                ->where('statut', '!=', 'annulee')
                ->where(function ($q) use ($validated) {
                    $q->where('heure_debut', '<', $validated['heure_fin'])
                      ->where('heure_fin', '>', $validated['heure_debut']);
                })
                ->exists();

            if ($conflitSalle) {
                return response()->json([
                    'message' => 'La salle est déjà occupée sur ce créneau.',
                ], 409);
            }
        }

        if (!empty($validated['tuteur_id'])) {
            $conflitTuteur = Soutenance::where('date_soutenance', $validated['date_soutenance'])
                ->where('tuteur_id', $validated['tuteur_id'])
                ->where('statut', '!=', 'annulee')
                ->where(function ($q) use ($validated) {
                    $q->where('heure_debut', '<', $validated['heure_fin'])
                      ->where('heure_fin', '>', $validated['heure_debut']);
                })
                ->exists();

            if ($conflitTuteur) {
                return response()->json([
                    'message' => 'Le tuteur est déjà occupé sur ce créneau.',
                ], 409);
            }
        }

        $soutenance = Soutenance::create($validated);

        $soutenance->load([
            'etudiant:id,nom,prenom,mail_universitaire',
            'tuteur:id,name'
        ]);

        return response()->json([
            'message' => 'Soutenance planifiée avec succès.',
            'data' => $this->formatSoutenance($soutenance),
        ], 201);
    }

    public function show(Soutenance $soutenance): JsonResponse
    {
        $soutenance->load([
            'etudiant:id,nom,prenom,mail_universitaire',
            'tuteur:id,name'
        ]);

        return response()->json([
            'data' => $this->formatSoutenance($soutenance),
        ]);
    }

    public function update(Request $request, Soutenance $soutenance): JsonResponse
    {
        $validated = $request->validate([
            'date_soutenance' => ['sometimes', 'date'],
            'heure_debut' => ['sometimes', 'date_format:H:i'],
            'heure_fin' => ['sometimes', 'date_format:H:i'],
            'salle' => ['nullable', 'string', 'max:100'],
            'titre_stage' => ['nullable', 'string', 'max:255'],
            'maitre_stage' => ['nullable', 'string', 'max:255'],
            'tuteur_id' => ['nullable', 'exists:users,id'],
            'statut' => ['sometimes', Rule::in([
                'planifiee',
                'confirmee',
                'terminee',
                'annulee'
            ])],
            'note' => ['nullable', 'numeric', 'min:0', 'max:20'],
            'commentaire' => ['nullable', 'string'],
        ]);

        $soutenance->update($validated);

        $soutenance->load([
            'etudiant:id,nom,prenom,mail_universitaire',
            'tuteur:id,name'
        ]);

        return response()->json([
            'message' => 'Soutenance mise à jour.',
            'data' => $this->formatSoutenance($soutenance),
        ]);
    }

    public function destroy(Soutenance $soutenance): JsonResponse
    {
        $soutenance->delete();

        return response()->json([
            'message' => 'Soutenance supprimée.',
        ]);
    }

    private function formatSoutenance(Soutenance $s): array
    {
        return [
            'id' => $s->id,

            'etudiant' => [
                'id' => $s->etudiant->id,
                'name' => trim($s->etudiant->prenom . ' ' . $s->etudiant->nom),
                'prenom' => $s->etudiant->prenom,
                'nom' => $s->etudiant->nom,
                'email' => $s->etudiant->mail_universitaire,
            ],

            'tuteur' => $s->tuteur ? [
                'id' => $s->tuteur->id,
                'name' => $s->tuteur->name,
            ] : null,

            'maitre_stage' => $s->maitre_stage,
            'date_soutenance' => $s->date_soutenance->toDateString(),
            'heure_debut' => $s->heure_debut,
            'heure_fin' => $s->heure_fin,
            'salle' => $s->salle,
            'titre_stage' => $s->titre_stage,
            'statut' => $s->statut,
            'statut_label' => $s->statut_label,
            'note' => $s->note,
            'commentaire' => $s->commentaire,
        ];
    }
}