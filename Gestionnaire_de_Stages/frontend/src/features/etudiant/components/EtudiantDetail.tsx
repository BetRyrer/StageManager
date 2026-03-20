import { useState } from "react";
import { Home, Mail, Pencil, Phone, Trash2, UserPlus, X } from "lucide-react";
import { etudiantService } from "../services/etudiant.service";
import { tuteurService } from "../services/tuteur.service";
import type { Etudiant } from "../types/etudiant";
import type { Tuteur } from "../types/tuteur";

interface EtudiantDetailProps {
    etudiant: Etudiant;
    onClose: () => void;
    onDelete: (etudiant: Etudiant) => void;
    onEdit: (etudiant: Etudiant) => void;
}

function EtudiantDetail({
    etudiant,
    onClose,
    onDelete,
    onEdit,
}: EtudiantDetailProps) {
    const [showTuteurPopup, setShowTuteurPopup] = useState<boolean>(false);
    const [tuteurs, setTuteurs] = useState<Tuteur[]>([]);
    const [loadingTuteurs, setLoadingTuteurs] = useState<boolean>(false);

    const loadTuteurs = async (): Promise<void> => {
        try {
            setLoadingTuteurs(true);
            const data = await tuteurService.getAll();
            setTuteurs(data);
        } catch {
            alert("Erreur lors du chargement des tuteurs");
        } finally {
            setLoadingTuteurs(false);
        }
    };

    const ajouterTuteur = async (tuteurId: number): Promise<void> => {
        try {
            await etudiantService.addTuteur(etudiant.id, tuteurId);
            alert("Tuteur ajouté avec succès");
            setShowTuteurPopup(false);
        } catch {
            alert("Erreur lors de l'ajout du tuteur");
        }
    };

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="relative w-full max-w-2xl rounded-xl bg-white p-6">
                    <div className="absolute right-4 top-4 flex gap-2">
                        <button
                            onClick={() => onDelete(etudiant)}
                            className="rounded bg-red-600 p-2 text-white transition hover:bg-red-700"
                        >
                            <Trash2 size={16} />
                        </button>

                        <button
                            onClick={() => onEdit(etudiant)}
                            className="rounded bg-blue-600 p-2 text-white transition hover:bg-blue-700"
                        >
                            <Pencil size={16} />
                        </button>
                    </div>

                    <h2 className="mb-4 text-2xl font-bold text-red-600">
                        Détails de {etudiant.nom} {etudiant.prenom}
                    </h2>

                    <div className="mb-4 rounded-lg bg-gray-50 p-4">
                        <p>
                            <strong>Nom :</strong> {etudiant.nom}
                        </p>
                        <p>
                            <strong>Prénom :</strong> {etudiant.prenom}
                        </p>

                        <p className="flex items-center gap-2">
                            <Mail size={16} />
                            {etudiant.mail_universitaire}
                        </p>

                        <p className="flex items-center gap-2">
                            <Phone size={16} />
                            {etudiant.tel_portable || "—"}
                        </p>

                        <p className="flex items-center gap-2">
                            <Home size={16} />
                            {etudiant.adresse || "—"}, {etudiant.code_postal || "—"}{" "}
                            {etudiant.ville || "—"}
                        </p>
                    </div>

                    <button
                        onClick={() => {
                            setShowTuteurPopup(true);
                            loadTuteurs();
                        }}
                        className="mb-4 flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                    >
                        <UserPlus size={18} />
                        Ajouter un tuteur
                    </button>

                    <div className="flex justify-end">
                        <button
                            onClick={onClose}
                            className="rounded bg-gray-200 px-4 py-2 text-gray-800 transition hover:bg-gray-300"
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            </div>

            {showTuteurPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="relative w-full max-w-md rounded-xl bg-white p-6">
                        <button
                            className="absolute right-3 top-3"
                            onClick={() => setShowTuteurPopup(false)}
                        >
                            <X size={20} />
                        </button>

                        <h2 className="mb-4 text-xl font-bold">Ajouter un tuteur</h2>

                        {loadingTuteurs ? (
                            <p>Chargement...</p>
                        ) : (
                            <ul className="space-y-2">
                                {tuteurs.map((tuteur) => (
                                    <li
                                        key={tuteur.id}
                                        className="flex items-center justify-between rounded border p-2"
                                    >
                                        <span>
                                            {tuteur.prenom} {tuteur.nom}
                                        </span>
                                        <button
                                            onClick={() => ajouterTuteur(tuteur.id)}
                                            className="rounded bg-green-600 px-3 py-1 text-white transition hover:bg-green-700"
                                        >
                                            Ajouter
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default EtudiantDetail;