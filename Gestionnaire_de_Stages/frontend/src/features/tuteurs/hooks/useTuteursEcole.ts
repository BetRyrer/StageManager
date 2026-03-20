import { useEffect, useState } from "react";
import { getAllTuteursEcole } from "../services/TuteurEcoleService";
import { TuteurEcole } from "../types/TuteurEcole";

export const useTuteursEcole = () => {
    const [tuteurs, setTuteurs] = useState<TuteurEcole[]>([]);
    const [selectedTuteur, setSelectedTuteur] = useState<TuteurEcole | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    const fetchTuteurs = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getAllTuteursEcole();
            setTuteurs(data);

            if (data.length > 0) {
                setSelectedTuteur(data[0]);
            }
        } catch (err) {
            console.error("Erreur lors du chargement des tuteurs :", err);
            setError("Impossible de charger les tuteurs.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTuteurs();
    }, []);

    return {
        tuteurs,
        selectedTuteur,
        setSelectedTuteur,
        loading,
        error,
        refetch: fetchTuteurs,
    };
};