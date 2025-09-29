<?php

namespace App\Http\Controllers;

use App\Models\Stage;
use Illuminate\Http\Request;
use App\Imports\StagesImport;
use Maatwebsite\Excel\Facades\Excel;

class StageController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/stages",
     *     summary="Lister tous les stages",
     *     tags={"Stages"},
     *     @OA\Parameter(
     *         name="status",
     *         in="query",
     *         required=false,
     *         description="Filtrer par statut (a_venir, en_cours, terminé)",
     *         @OA\Schema(type="string", example="en_cours")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Liste des stages récupérée avec succès"
     *     )
     * )
     */
    public function index(Request $request)
    {
        $statusFilter = $request->query('status'); 

        $stages = Stage::with(['etudiant', 'entreprise', 'tuteur'])->get();

        if ($statusFilter) {
            $stages = $stages->filter(function ($stage) use ($statusFilter) {
                return $stage->status === $statusFilter;
            })->values(); 
        }

        return $stages;
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
        $validated = $request->validate([
            'titre' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'date_debut' => 'sometimes|date',
            'date_fin' => 'nullable|date',
            'entreprise_id' => 'sometimes|exists:entreprises,id',
            'etudiant_id' => 'sometimes|exists:etudiants,id',
            'tuteur_id' => 'nullable|exists:tuteurs,id',
        ]);

        $stage->update($validated);
        return $stage;
    }

    /**
     * @OA\Get(
     *     path="/api/dashboard",
     *     summary="Statistiques globales des stages",
     *     tags={"Stages"},
     *     @OA\Parameter(
     *         name="status",
     *         in="query",
     *         required=false,
     *         description="Si renseigné, renvoie uniquement le compteur pour ce statut (a_venir, en_cours, terminé)",
     *         @OA\Schema(type="string", example="terminé")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Compteurs des stages récupérés avec succès"
     *     )
     * )
     */
    public function dashboard(Request $request)
    {
        $statusFilter = $request->query('status');
        $stages = Stage::all();

        if ($statusFilter) {
            return response()->json([
                $statusFilter => $stages->where('status', $statusFilter)->count()
            ]);
        }

        return response()->json([
            'a_venir'   => $stages->where('status', 'a_venir')->count(),
            'en_cours'  => $stages->where('status', 'en_cours')->count(),
            'termines'  => $stages->where('status', 'terminé')->count(),
            'total'     => $stages->count(),
        ]);
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

    /**
     * @OA\Post(
     *     path="/api/stages/import",
     *     summary="Importer des stages depuis un fichier CSV",
     *     tags={"Stages"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="fichier",
     *                     type="string",
     *                     format="binary",
     *                     description="Fichier CSV à importer"
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Importation réussie"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Erreur de validation"
     *     )
     * )
     */
    public function import(Request $request)
    {
        $request->validate([
            'fichier' => 'required|mimes:csv,txt'
        ]);

        Excel::import(new StagesImport, $request->file('fichier'));

        return response()->json(['message' => 'Importation réussie'], 200);
    }
}
