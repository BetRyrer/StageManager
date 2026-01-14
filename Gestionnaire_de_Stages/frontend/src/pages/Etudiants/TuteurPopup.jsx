import { useEffect, useState } from "react";
import axios from "../../services/api"; // ton instance avec token
import Button from "../../components/Buttons/Button";

function TuteurPopup({ etudiant, onClose }) {
    const [tuteurs, setTuteurs] = useState([]);

    useEffect(() => {
        axios.get("/tuteurs-ecole")
            .then(res => setTuteurs(res.data))
            .catch(err => console.error(err));
    }, []);

    const ajouterTuteur = async (tuteurId) => {
        try {
            await axios.post(`/etudiants/${etudiant.id}/tuteurs`, {
                tuteur_id: tuteurId,
            });
            onClose();
        } catch (err) {
            alert(err.response?.data?.message || "Erreur");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">

                <h2 className="text-xl font-bold mb-4">
                    Ajouter un tuteur
                </h2>

                <ul className="space-y-2">
                    {tuteurs.map(tuteur => (
                        <li
                            key={tuteur.id}
                            className="flex justify-between items-center border p-2 rounded"
                        >
                            <span>
                                {tuteur.prenom} {tuteur.nom}
                            </span>

                            <Button
                                variant="primary"
                                onClick={() => ajouterTuteur(tuteur.id)}
                            >
                                Ajouter
                            </Button>
                        </li>
                    ))}
                </ul>

                <div className="flex justify-end mt-4">
                    <Button variant="secondary" onClick={onClose}>
                        Fermer
                    </Button>
                </div>

            </div>
        </div>
    );
}

export default TuteurPopup;
