<?php

namespace App\Http\Controllers;

use App\Models\Etudiant;
use App\Models\TuteurEcole;
use Illuminate\Http\Request;

class TuteurEcoleController extends Controller
{
    /**
     * GET - récupérer tous les tuteurs
     */
    public function index()
    {
        return response()->json(
            TuteurEcole::all(),
            200
        );
    }

    /**
     * POST - associer un tuteur à un étudiant
     */
    public function attachToEtudiant(Request $request, $etudiantId)
    {
        $request->validate([
            'tuteur_id' => 'required|exists:tuteur_ecoles,id',
        ]);

        $etudiant = Etudiant::findOrFail($etudiantId);

        // règle métier : max 2 tuteurs
        if ($etudiant->tuteurs()->count() >= 2) {
            return response()->json([
                'message' => 'Un étudiant ne peut pas avoir plus de 2 tuteurs.'
            ], 422);
        }

        // éviter doublon
        if ($etudiant->tuteurs()->where('tuteur_ecole_id', $request->tuteur_id)->exists()) {
            return response()->json([
                'message' => 'Ce tuteur est déjà associé à cet étudiant.'
            ], 409);
        }

        $etudiant->tuteurs()->attach($request->tuteur_id);

        return response()->json([
            'message' => 'Tuteur ajouté avec succès.'
        ], 201);
    }
}
