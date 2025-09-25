<?php

namespace App\Http\Controllers;

use App\Models\Etudiant;
use Illuminate\Http\Request;

class EtudiantController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/etudiants",
     *     summary="Liste tous les étudiants",
     *     tags={"Etudiants"},
     *     @OA\Response(
     *         response=200,
     *         description="Liste des étudiants"
     *     )
     * )
     */
    public function index()
    {
        return Etudiant::with('stages')->get();
    }

    /**
     * @OA\Post(
     *     path="/api/etudiants",
     *     summary="Créer un étudiant",
     *     tags={"Etudiants"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"nom","prenom","email","filiere","annee"},
     *             @OA\Property(property="nom", type="string", example="Dupont"),
     *             @OA\Property(property="prenom", type="string", example="Jean"),
     *             @OA\Property(property="email", type="string", example="jean.dupont@example.com"),
     *             @OA\Property(property="filiere", type="string", example="Informatique"),
     *             @OA\Property(property="annee", type="string", example="BUT2")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Étudiant créé avec succès"
     *     )
     * )
     */
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

    /**
     * @OA\Get(
     *     path="/api/etudiants/{id}",
     *     summary="Afficher un étudiant",
     *     tags={"Etudiants"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID de l'étudiant",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Étudiant trouvé"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Étudiant non trouvé"
     *     )
     * )
     */
    public function show(Etudiant $etudiant)
    {
        return $etudiant->load('stage');
    }

    /**
     * @OA\Put(
     *     path="/api/etudiants/{id}",
     *     summary="Mettre à jour un étudiant",
     *     tags={"Etudiants"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID de l'étudiant",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="nom", type="string", example="Durand"),
     *             @OA\Property(property="prenom", type="string", example="Paul"),
     *             @OA\Property(property="email", type="string", example="paul.durand@example.com"),
     *             @OA\Property(property="filiere", type="string", example="Maths"),
     *             @OA\Property(property="annee", type="string", example="BUT3")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Étudiant mis à jour"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Étudiant non trouvé"
     *     )
     * )
     */
    public function update(Request $request, Etudiant $etudiant)
    {
        $etudiant->update($request->all());
        return $etudiant;
    }

    /**
     * @OA\Delete(
     *     path="/api/etudiants/{id}",
     *     summary="Supprimer un étudiant",
     *     tags={"Etudiants"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID de l'étudiant",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Étudiant supprimé"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Étudiant non trouvé"
     *     )
     * )
     */
    public function destroy(Etudiant $etudiant)
    {
        $etudiant->delete();
        return response()->noContent();
    }
}
