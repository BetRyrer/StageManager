import api from "../../../api/axios";
import type { Etudiant } from "../types/etudiant";

export const etudiantService = {
    async getAll(): Promise<Etudiant[]> {
        const res = await api.get<Etudiant[]>("/etudiants");
        return Array.isArray(res.data) ? res.data : [];
    },

    async deleteById(id: number): Promise<void> {
        await api.delete(`/etudiants/${id}`);
    },

    async addTuteur(etudiantId: number, tuteurId: number): Promise<void> {
        await api.post(`/etudiants/${etudiantId}/tuteurs`, {
            tuteur_id: tuteurId,
        });
    },
};