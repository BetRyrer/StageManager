import { useEffect, useMemo, useState } from "react";
import { etudiantService } from "../services/etudiant.service";
import type { Etudiant } from "../types/etudiant";

export function useEtudiants() {
    const [etudiants, setEtudiants] = useState<Etudiant[]>([]);
    const [selectedEtudiant, setSelectedEtudiant] = useState<Etudiant | null>(null);
    const [search, setSearch] = useState<string>("");
    const [butYear, setButYear] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        etudiantService
            .getAll()
            .then(setEtudiants)
            .catch((error) => {
                console.error("Erreur chargement étudiants :", error);
                setEtudiants([]);
            })
            .finally(() => setLoading(false));
    }, []);

    const filteredEtudiants = useMemo(() => {
        return etudiants.filter((e) => {
            const nom = e.nom?.toLowerCase() || "";
            const prenom = e.prenom?.toLowerCase() || "";
            const email = e.mail_universitaire?.toLowerCase() || "";
            const annee = e.annee || "";
            const searchLower = search.toLowerCase();

            const matchSearch =
                nom.includes(searchLower) ||
                prenom.includes(searchLower) ||
                email.includes(searchLower);

            const matchYear = butYear ? annee === butYear : true;

            return matchSearch && matchYear;
        });
    }, [etudiants, search, butYear]);

    const deleteEtudiant = async (etudiant: Etudiant): Promise<boolean> => {
        try {
            await etudiantService.deleteById(etudiant.id);
            setEtudiants((prev) => prev.filter((e) => e.id !== etudiant.id));
            setSelectedEtudiant(null);
            return true;
        } catch (error) {
            console.error("Erreur suppression étudiant :", error);
            return false;
        }
    };

    return {
        etudiants,
        filteredEtudiants,
        selectedEtudiant,
        setSelectedEtudiant,
        search,
        setSearch,
        butYear,
        setButYear,
        loading,
        deleteEtudiant,
    };
}