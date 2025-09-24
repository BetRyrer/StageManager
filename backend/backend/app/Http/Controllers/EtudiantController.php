<?php

namespace App\Http\Controllers;

use App\Models\Etudiant;
use Illuminate\Http\Request;

class EtudiantController extends Controller
{
    public function index()
    {
        return Etudiant::with('stages')->get();
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
        return $etudiant->load('stages');
    }

    public function update(Request $request, Etudiant $etudiant)
    {
        $etudiant->update($request->all());
        return $etudiant;
    }

    public function destroy(Etudiant $etudiant)
    {
        $etudiant->delete();
        return response()->noContent();
    }
}

