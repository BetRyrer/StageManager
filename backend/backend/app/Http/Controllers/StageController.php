<?php

namespace App\Http\Controllers;

use App\Models\Stage;
use Illuminate\Http\Request;

class StageController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/stages",
     *     summary="Lister tous les stages",
     *     tags={"Stages"},
     *     @OA\Response(
     *         response=200,
     *         description="Liste des stages récupérée avec succès"
     *     )
     * )
     */
    public function index()
    {
        return Stage::with(['etudiant', 'entreprise', 'tuteur'])->get();
    }

    /**
     * @OA\Post(
     *     path="/api/stages",
     *     summary="Créer un stage",
     *     tags={"Stages"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"titre","description","date_debut","entreprise_id","etudiant_id"},
     *             @OA\Property(property="titre", type="string", example="Développement d’une application web"),
     *             @OA\Property(property="description", type="string", example="Stage de 2 mois en développement fullstack avec Laravel et React."),
     *             @OA\Property(property="date_debut", type="string", format="date", example="2025-06-01"),
     *             @OA\Property(property="date_fin", type="string", format="date", example="2025-08-01"),
     *             @OA\Property(property="entreprise_id", type="integer", example=1),
     *             @OA\Property(property="etudiant_id", type="integer", example=2),
     *             @OA\Property(property="tuteur_id", type="integer", nullable=true, example=3)
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Stage créé avec succès"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Erreur de validation"
     *     )
     * )
     */
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

    /**
     * @OA\Get(
     *     path="/api/stages/{id}",
     *     summary="Récupérer un stage par ID",
     *     tags={"Stages"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID du stage",
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Stage trouvé"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Stage non trouvé"
     *     )
     * )
     */
    public function show(Stage $stage)
    {
        return $stage->load(['etudiant', 'entreprise', 'tuteur']);
    }

    /**
     * @OA\Put(
     *     path="/api/stages/{id}",
     *     summary="Mettre à jour un stage",
     *     tags={"Stages"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID du stage",
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="titre", type="string", example="Nouveau titre"),
     *             @OA\Property(property="description", type="string", example="Mise à jour de la description"),
     *             @OA\Property(property="date_debut", type="string", format="date", example="2025-07-01"),
     *             @OA\Property(property="date_fin", type="string", format="date", example="2025-09-01"),
     *             @OA\Property(property="entreprise_id", type="integer", example=1),
     *             @OA\Property(property="etudiant_id", type="integer", example=2),
     *             @OA\Property(property="tuteur_id", type="integer", nullable=true, example=3)
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Stage mis à jour avec succès"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Stage non trouvé"
     *     )
     * )
     */
    public function update(Request $request, Stage $stage)
    {
        $stage->update($request->all());
        return $stage;
    }

    /**
     * @OA\Delete(
     *     path="/api/stages/{id}",
     *     summary="Supprimer un stage",
     *     tags={"Stages"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID du stage",
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Stage supprimé avec succès"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Stage non trouvé"
     *     )
     * )
     */
    public function destroy(Stage $stage)
    {
        $stage->delete();
        return response()->noContent();
    }
}
