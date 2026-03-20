import api from "../../../api/axios";
import { TuteurEcole } from "../types/TuteurEcole";

export const getAllTuteursEcole = async (): Promise<TuteurEcole[]> => {
    const response = await api.get<TuteurEcole[]>("/tuteurs-all");
    return response.data;
};