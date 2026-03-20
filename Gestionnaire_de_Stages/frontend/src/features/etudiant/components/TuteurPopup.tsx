import { useEffect, useState } from "react";
import { etudiantService } from "../services/etudiant.service";
import { tuteurService } from "../services/tuteur.service";
import type { Etudiant } from "../types/etudiant";
import type { Tuteur } from "../types/tuteur";

interface TuteurPopupProps {
    etudiant: Etudiant;
    onClose: () => void;
}

function TuteurPopup({ etudiant, onClose }: TuteurPopupProps) {
    const [tuteurs, setTuteurs] = useState<Tuteur[]>([]);

    useEffect(() => {
        tuteurService
            .getEcole()
            .then(setTuteurs)
            .catch((err) => console.error(err));
    }, []);

    const ajouterTuteur = async (tuteurId: number): Promise<void> => {
        try {
            await etudiantService.addTuteur(etudiant.id, tuteurId);
            onClose();
        } catch (err: any) {
            alert(err?.response?.data?.message || "Erreur");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md rounded-xl bg-white p-6">
                <h2 className="mb-4 text-xl font-bold">Ajouter un tuteur</h2>

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
                                className="rounded bg-blue-600 px-3 py-1 text-white transition hover:bg-blue-700"
                            >
                                Ajouter
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="mt-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="rounded bg-gray-200 px-4 py-2 text-gray-800 transition hover:bg-gray-300"
                    >
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TuteurPopup;