import { useState, useEffect, useCallback } from "react";
import api from "../../../api/axios";
import type {
    Soutenance,
    SoutenanceFiltres,
    SoutenancesResponse,
    SoutenancePayload,
} from "../types/soutenance";

const API_BASE = "/soutenances";

export function useSoutenances(filtres: SoutenanceFiltres = {}) {
    const [soutenances, setSoutenances] = useState<Soutenance[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSoutenances = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await api.get<SoutenancesResponse>(API_BASE, {
                params: {
                    ...(filtres.semaine ? { semaine: filtres.semaine } : {}),
                    ...(filtres.annee_scolaire
                        ? { annee_scolaire: filtres.annee_scolaire }
                        : {}),
                },
            });

            setSoutenances(response.data.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erreur inconnue");
        } finally {
            setLoading(false);
        }
    }, [filtres.semaine, filtres.annee_scolaire]);

    useEffect(() => {
        fetchSoutenances();
    }, [fetchSoutenances]);

    const creerSoutenance = async (
        payload: SoutenancePayload
    ): Promise<Soutenance> => {
        const response = await api.post<{
            message: string;
            data: Soutenance;
        }>(API_BASE, payload);

        setSoutenances((prev) =>
            [...prev, response.data.data].sort((a, b) =>
                `${a.date_soutenance}${a.heure_debut}`.localeCompare(
                    `${b.date_soutenance}${b.heure_debut}`
                )
            )
        );

        return response.data.data;
    };

    const mettreAJour = async (
        id: number,
        changes: Partial<Soutenance>
    ): Promise<Soutenance> => {
        const response = await api.put<{
            message: string;
            data: Soutenance;
        }>(`${API_BASE}/${id}`, changes);

        setSoutenances((prev) =>
            prev.map((s) => (s.id === id ? response.data.data : s))
        );

        return response.data.data;
    };

    const supprimerSoutenance = async (id: number): Promise<void> => {
        await api.delete(`${API_BASE}/${id}`);

        setSoutenances((prev) => prev.filter((s) => s.id !== id));
    };

    const getSoutenance = async (id: number): Promise<Soutenance> => {
        const response = await api.get<{
            data: Soutenance;
        }>(`${API_BASE}/${id}`);

        return response.data.data;
    };

    return {
        soutenances,
        loading,
        error,
        refetch: fetchSoutenances,
        creerSoutenance,
        mettreAJour,
        supprimerSoutenance,
        getSoutenance,
    };
}