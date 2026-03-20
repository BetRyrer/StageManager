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
     *         description="Filtrer par statut (attente, en_cours, termines)",
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

        $stages = Stage::with([
            'etudiant.tuteurs',
            'entreprise',
            'tuteur'
        ])->get();

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
     *             required={"date_debut","entreprise_id","etudiant_id"},
     *             @OA\Property(property="date_debut", type="string", format="date", example="2025-06-01"),
     *             @OA\Property(property="date_fin", type="string", format="date", example="2025-08-01"),
     *             @OA\Property(property="entreprise_id", type="integer", example=1),
     *             @OA\Property(property="etudiant_id", type="integer", example=2),
     *             @OA\Property(property="tuteur_id", type="integer", nullable=true, example=3),
     *             @OA\Property(property="thematique", type="string", example="Développement web"),
     *             @OA\Property(property="sujet", type="string", example="Création d'une application web"),
     *             @OA\Property(property="gratification", type="string", example="600"),
     *             @OA\Property(property="unite_gratification", type="string", example="€ / mois")
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
            'etudiant_id' => 'required|exists:etudiants,id',
            'entreprise_id' => 'required|exists:entreprises,id',
            'tuteur_id' => 'nullable|exists:tuteurs,id',
            'date_debut' => 'required|date',
            'date_fin' => 'nullable|date',
            'interruption' => 'nullable|string',
            'date_debut_interruption' => 'nullable|date',
            'date_fin_interruption' => 'nullable|date',
            'thematique' => 'nullable|string',
            'sujet' => 'nullable|string',
            'fonctions_taches' => 'nullable|string',
            'detail_projet' => 'nullable|string',
            'duree_stage' => 'nullable|numeric',
            'nb_jours_travail' => 'nullable|numeric',
            'nb_heures_hebdo' => 'nullable|numeric',
            'gratification' => 'nullable',
            'unite_gratification' => 'nullable|string',
            'validation_administrative' => 'nullable|string',
            'validation_pedagogique' => 'nullable|string',
            'avenants' => 'nullable|string',
            'date_creation_convention' => 'nullable|date',
            'date_modification_convention' => 'nullable|date',
            'annee_universitaire' => 'nullable|string',
            'type_convention' => 'nullable|string',
            'commentaire_stage' => 'nullable|string',
            'commentaire_duree_travail' => 'nullable|string',
            'code_elp' => 'nullable|string',
            'element_pedagogique' => 'nullable|string',
        ]);

        return Stage::create($validated)->load([
            'etudiant.tuteurs',
            'entreprise',
            'tuteur'
        ]);
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
        return $stage->load([
            'etudiant.tuteurs',
            'entreprise',
            'tuteur'
        ]);
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
            'etudiant_id' => 'sometimes|exists:etudiants,id',
            'entreprise_id' => 'sometimes|exists:entreprises,id',
            'tuteur_id' => 'nullable|exists:tuteurs,id',
            'date_debut' => 'sometimes|date',
            'date_fin' => 'nullable|date',
            'interruption' => 'nullable|string',
            'date_debut_interruption' => 'nullable|date',
            'date_fin_interruption' => 'nullable|date',
            'thematique' => 'nullable|string',
            'sujet' => 'nullable|string',
            'fonctions_taches' => 'nullable|string',
            'detail_projet' => 'nullable|string',
            'duree_stage' => 'nullable|numeric',
            'nb_jours_travail' => 'nullable|numeric',
            'nb_heures_hebdo' => 'nullable|numeric',
            'gratification' => 'nullable',
            'unite_gratification' => 'nullable|string',
            'validation_administrative' => 'nullable|string',
            'validation_pedagogique' => 'nullable|string',
            'avenants' => 'nullable|string',
            'date_creation_convention' => 'nullable|date',
            'date_modification_convention' => 'nullable|date',
            'annee_universitaire' => 'nullable|string',
            'type_convention' => 'nullable|string',
            'commentaire_stage' => 'nullable|string',
            'commentaire_duree_travail' => 'nullable|string',
            'code_elp' => 'nullable|string',
            'element_pedagogique' => 'nullable|string',
        ]);

        $stage->update($validated);

        return $stage->load([
            'etudiant.tuteurs',
            'entreprise',
            'tuteur'
        ]);
    }

    /**
     * @OA\Get(
     *     path="/api/dashboard",
     *     summary="Statistiques globales des stages",
     *     tags={"Stages"},
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
            'attente' => $stages->where('status', 'attente')->count(),
            'en_cours' => $stages->where('status', 'en_cours')->count(),
            'termines' => $stages->where('status', 'termines')->count(),
            'total' => $stages->count(),
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
     *     @OA\Response(
     *         response=200,
     *         description="Importation réussie"
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