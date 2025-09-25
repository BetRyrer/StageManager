<?php

namespace App\Http\Controllers;

use App\Models\Entreprise;
use Illuminate\Http\Request;

class EntrepriseController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/entreprises",
     *     summary="Lister toutes les entreprises",
     *     tags={"Entreprises"},
     *     @OA\Response(
     *         response=200,
     *         description="Liste des entreprises récupérée avec succès"
     *     )
     * )
     */
    public function index()
    {
        return Entreprise::with(['stages', 'tuteurs'])->get();
    }

    /**
     * @OA\Post(
     *     path="/api/entreprises",
     *     summary="Créer une entreprise",
     *     tags={"Entreprises"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"nom","ville"},
     *             @OA\Property(property="nom", type="string", example="BigBen Connected"),
     *             @OA\Property(property="secteur", type="string", example="Technologie"),
     *             @OA\Property(property="adresse", type="string", example="123 Rue de Paris"),
     *             @OA\Property(property="ville", type="string", example="Fontainebleau"),
     *             @OA\Property(property="site_web", type="string", example="https://www.bigben.com")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Entreprise créée avec succès"
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
            'nom' => 'required|string|max:255',
            'secteur' => 'nullable|string|max:255',
            'adresse' => 'nullable|string|max:255',
            'ville' => 'required|string|max:255',
            'site_web' => 'nullable|string|max:255',
        ]);

        return Entreprise::create($validated);
    }

    /**
     * @OA\Get(
     *     path="/api/entreprises/{id}",
     *     summary="Récupérer une entreprise par ID",
     *     tags={"Entreprises"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID de l'entreprise",
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Entreprise trouvée"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Entreprise non trouvée"
     *     )
     * )
     */
    public function show(Entreprise $entreprise)
    {
        return $entreprise->load(['stages', 'tuteurs']);
    }

    /**
     * @OA\Put(
     *     path="/api/entreprises/{id}",
     *     summary="Mettre à jour une entreprise",
     *     tags={"Entreprises"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID de l'entreprise",
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="nom", type="string", example="Nouvelle Entreprise"),
     *             @OA\Property(property="secteur", type="string", example="Informatique"),
     *             @OA\Property(property="adresse", type="string", example="456 Avenue de Lyon"),
     *             @OA\Property(property="ville", type="string", example="Paris"),
     *             @OA\Property(property="site_web", type="string", example="https://www.example.com")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Entreprise mise à jour avec succès"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Entreprise non trouvée"
     *     )
     * )
     */
    public function update(Request $request, Entreprise $entreprise)
    {
        $entreprise->update($request->all());
        return $entreprise;
    }

    /**
     * @OA\Delete(
     *     path="/api/entreprises/{id}",
     *     summary="Supprimer une entreprise",
     *     tags={"Entreprises"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID de l'entreprise",
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Entreprise supprimée avec succès"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Entreprise non trouvée"
     *     )
     * )
     */
    public function destroy(Entreprise $entreprise)
    {
        $entreprise->delete();
        return response()->noContent();
    }
}
