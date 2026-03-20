import api from "./../../../api/axios";
import { Stage } from "../types/stage";

const statusMapping: Record<string, string> = {
    actifs: "en_cours",
    attente: "attente",
    termines: "termines",
    total: "",
};

export const getStagesByStatus = async (status: string): Promise<Stage[]> => {
    const mappedStatus = statusMapping[status];
    const apiUrl = mappedStatus ? `/stages?status=${mappedStatus}` : "/stages";

    const res = await api.get(apiUrl);
    return Array.isArray(res.data) ? res.data : [];
};

export const getAllStages = async (): Promise<Stage[]> => {
    const res = await api.get("/stages");
    return Array.isArray(res.data) ? res.data : [];
};

export const getStageApiUrlByStatus = (status: string): string => {
    const mappedStatus = statusMapping[status];
    return mappedStatus ? `stages?status=${mappedStatus}` : "stages";
};