<?php
namespace App\Http\Controllers;

use App\Models\Tuteur;
use Illuminate\Http\Request;

class TuteurController extends Controller
{
    public function index()
    {
        return Tuteur::with(['stages', 'entreprise', 'user'])->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|email|unique:tuteurs,email',
            'telephone' => 'nullable|string|max:20',
            'type' => 'required|in:ecole,entreprise',
            'entreprise_id' => 'nullable|exists:entreprises,id',
            'user_id' => 'nullable|exists:users,id',
        ]);

        return Tuteur::create($validated);
    }

    public function show(Tuteur $tuteur)
    {
        return $tuteur->load(['stages', 'entreprise', 'user']);
    }

    public function update(Request $request, Tuteur $tuteur)
    {
        $tuteur->update($request->all());
        return $tuteur;
    }

    public function destroy(Tuteur $tuteur)
    {
        $tuteur->delete();
        return response()->noContent();
    }
}
