<?php

namespace App\Http\Controllers;

use App\Models\Entreprise;
use Illuminate\Http\Request;

class EntrepriseController extends Controller
{
    public function index()
    {
        return Entreprise::with(['stages', 'tuteurs'])->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'secteur' => 'nullable|string|max:255',
            'adresse' => 'nullable|string|max:255',
            'ville' => 'required|string|max:255',
            'site_web' => 'nullable|string|max:255',
        ]);

        return Entreprise::create($validated);
    }

    public function show(Entreprise $entreprise)
    {
        return $entreprise->load(['stages', 'tuteurs']);
    }

    public function update(Request $request, Entreprise $entreprise)
    {
        $entreprise->update($request->all());
        return $entreprise;
    }

    public function destroy(Entreprise $entreprise)
    {
        $entreprise->delete();
        return response()->noContent();
    }
}

