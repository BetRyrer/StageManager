<?php

namespace App\Http\Controllers;

use App\Models\Stage;
use Illuminate\Http\Request;

class StageController extends Controller
{
    public function index()
    {
        return Stage::with(['etudiant', 'entreprise', 'tuteur'])->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'titre' => 'required|string|max:255',
            'description' => 'required|string',
            'date_debut' => 'required|date',
            'date_fin' => 'nullable|date',
            'entreprise_id' => 'required|exists:entreprises,id',
            'etudiant_id' => 'required|exists:etudiants,id',
            'tuteur_id' => 'nullable|exists:tuteurs,id',
        ]);

        return Stage::create($validated);
    }

    public function show(Stage $stage)
    {
        return $stage->load(['etudiant', 'entreprise', 'tuteur']);
    }

    public function update(Request $request, Stage $stage)
    {
        $stage->update($request->all());
        return $stage;
    }

    public function destroy(Stage $stage)
    {
        $stage->delete();
        return response()->noContent();
    }
}
