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

    /**
     * @OA\Post(
     *     path="/api/tuteurs",
     *     summary="Créer un tuteur",
     *     tags={"Tuteurs"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"nom","prenom","email","type"},
     *             @OA\Property(property="nom", type="string", example="Martin"),
     *             @OA\Property(property="prenom", type="string", example="Pierre"),
     *             @OA\Property(property="email", type="string", example="pierre.martin@example.com"),
     *             @OA\Property(property="telephone", type="string", example="+33 6 12 34 56 78"),
     *             @OA\Property(property="type", type="string", enum={"ecole","entreprise"}, example="entreprise"),
     *             @OA\Property(property="entreprise_id", type="integer", nullable=true, example=1),
     *             @OA\Property(property="user_id", type="integer", nullable=true, example=2)
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Tuteur créé avec succès"
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
            'prenom' => 'required|string|max:255',
            'email' => 'required|email|unique:tuteurs,email',
            'telephone' => 'nullable|string|max:20',
            'type' => 'required|in:ecole,entreprise',
            'entreprise_id' => 'nullable|exists:entreprises,id',
            'user_id' => 'nullable|exists:users,id',
        ]);

        return Tuteur::create($validated);
    }
    /* 
     * @OA\Get(
     *     path="/api/tuteurs/{id}",
     *     summary="Afficher un tuteur",
     *     tags={"Tuteurs"},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Tuteur trouvé"),
     *     @OA\Response(response=404, description="Tuteur non trouvé")
     * )
     */
    public function show(Tuteur $tuteur)
    {
        return $tuteur->load(['stages', 'entreprise', 'user']);
    }
    /**
     * @OA\Put(
     *     path="/api/tuteurs/{id}",
     *     summary="Mettre à jour un tuteur",
     *     tags={"Tuteurs"},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\RequestBody(
     *         @OA\JsonContent(
     *             @OA\Property(property="nom", type="string", example="Martin"),
     *             @OA\Property(property="prenom", type="string", example="Pierre"),
     *             @OA\Property(property="email", type="string", example="pierre.martin@example.com")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Tuteur mis à jour"),
     *     @OA\Response(response=404, description="Tuteur non trouvé")
     * )
     */
    public function update(Request $request, Tuteur $tuteur)
    {
        $tuteur->update($request->all());
        return $tuteur;
    }
    /* @OA\Delete(
     *     path="/api/tuteurs/{id}",
     *     summary="Supprimer un tuteur",
     *     tags={"Tuteurs"},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=204, description="Tuteur supprimé"),
     *     @OA\Response(response=404, description="Tuteur non trouvé")
     * )
     */
    public function destroy(Tuteur $tuteur)
    {
        $tuteur->delete();
        return response()->noContent();
    }
}
