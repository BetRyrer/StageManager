import api from "../../../api/axios";
import type { Tuteur } from "../types/tuteur";

export const tuteurService = {
    async getAll(): Promise<Tuteur[]> {
        const res = await api.get<Tuteur[]>("/tuteurs-all");
        return Array.isArray(res.data) ? res.data : [];
    },

    async getEcole(): Promise<Tuteur[]> {
        const res = await api.get<Tuteur[]>("/tuteurs-ecole");
        return Array.isArray(res.data) ? res.data : [];
    },
};