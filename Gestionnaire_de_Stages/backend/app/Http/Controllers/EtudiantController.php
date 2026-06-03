<?php

namespace App\Http\Controllers;

use App\Models\Etudiant;
use Illuminate\Http\Request;

class EtudiantController extends Controller
{
    public function index()
    {
        return Etudiant::with(['stage', 'tuteurs'])->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|email|unique:etudiants,email',
            'filiere' => 'required|string|max:255',
            'annee' => 'required|string|max:10',
        ]);

        return Etudiant::create($validated);
    }

    public function show(Etudiant $etudiant)
    {
        return $etudiant->load(['stage', 'tuteurs']);
    }

    public function update(Request $request, Etudiant $etudiant)
    {
        $validated = $request->validate([
            'nom' => 'sometimes|required|string|max:255',
            'prenom' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:etudiants,email,' . $etudiant->id,
            'filiere' => 'sometimes|required|string|max:255',
            'annee' => 'sometimes|required|string|max:10',
        ]);

        $etudiant->update($validated);

        return $etudiant;
    }

    public function search(Request $request)
    {
        $search = $request->query('search');

        if (!$search) {
            return response()->json([
                'data' => [],
            ]);
        }

        $etudiants = Etudiant::query()
            ->with(['stage.tuteur'])
            ->where('nom', 'like', "%{$search}%")
            ->orWhere('prenom', 'like', "%{$search}%")
            ->limit(10)
            ->get()
            ->map(function ($etudiant) {
                $stage = $etudiant->stage;

                return [
                    'id' => $etudiant->id,
                    'nom' => $etudiant->nom,
                    'prenom' => $etudiant->prenom,
                    'mail_universitaire' => $etudiant->mail_universitaire,

                    'stage' => $stage ? [
                        'id' => $stage->id,
                        'titre_stage' => $stage->sujet,

                        'maitre_stage' => $stage->tuteur
                            ? trim(
                                ($stage->tuteur->prenom ?? '') . ' ' .
                                ($stage->tuteur->nom ?? '')
                            )
                            : null,

                        'tuteur' => null,
                    ] : null,
                ];
            });

        return response()->json([
            'data' => $etudiants,
        ]);
    }

    public function destroy(Etudiant $etudiant)
    {
        $etudiant->delete();

        return response()->noContent();
    }
}