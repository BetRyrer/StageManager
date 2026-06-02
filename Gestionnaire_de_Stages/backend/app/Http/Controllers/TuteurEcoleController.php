<?php

namespace App\Http\Controllers;

use App\Models\Etudiant;
use App\Models\TuteurEcole;
use Illuminate\Http\Request;

class TuteurEcoleController extends Controller
{
    /**
     * Liste des tuteurs école
     */
    public function index()
    {
        return response()->json(
            TuteurEcole::with('etudiants')->get(),
            200
        );
    }

    /**
     * Création d'un tuteur école
     */
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
        ]);

        $tuteur = TuteurEcole::create([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
        ]);

        return response()->json([
            'message' => 'Tuteur créé avec succès.',
            'data' => $tuteur,
        ], 201);
    }

    /**
     * Associer un tuteur à un étudiant
     */
    public function attachToEtudiant(Request $request, $etudiantId)
    {
        $request->validate([
            'tuteur_id' => 'required|exists:tuteur_ecoles,id',
        ]);

        $etudiant = Etudiant::findOrFail($etudiantId);

        if ($etudiant->tuteurs()->count() >= 2) {
            return response()->json([
                'message' => 'Un étudiant ne peut pas avoir plus de 2 tuteurs.'
            ], 422);
        }

        if (
            $etudiant->tuteurs()
                ->where('tuteur_ecole_id', $request->tuteur_id)
                ->exists()
        ) {
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