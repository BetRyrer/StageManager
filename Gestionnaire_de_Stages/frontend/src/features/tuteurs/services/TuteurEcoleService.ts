import api from "../../../api/axios";
import { TuteurEcole } from "../types/TuteurEcole";

type CreateTuteurEcoleData = {
    nom: string;
    prenom: string;
};

type CreateTuteurEcoleResponse = {
    message: string;
    data: TuteurEcole;
};

export const getAllTuteursEcole = async (): Promise<TuteurEcole[]> => {
    const response = await api.get<TuteurEcole[]>("/tuteurs-all");
    return response.data;
};

export const createTuteurEcole = async (
    data: CreateTuteurEcoleData
): Promise<TuteurEcole> => {
    const response = await api.post<CreateTuteurEcoleResponse>(
        "/tuteurs-all",
        data
    );

    return response.data.data;
};