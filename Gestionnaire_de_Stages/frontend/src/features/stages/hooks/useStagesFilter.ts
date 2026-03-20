import { Stage } from "../types/stage";

interface UseStagesFilterParams {
    stages: Stage[];
    search: string;
}

export const useStagesFilter = ({
    stages,
    search,
}: UseStagesFilterParams): Stage[] => {
    return stages.filter((s) => {
        const entreprise = s.entreprise?.nom?.toLowerCase() || "";
        const sujet = s.sujet?.toLowerCase() || "";
        const etudiantNom = s.etudiant?.nom?.toLowerCase() || "";
        const etudiantPrenom = s.etudiant?.prenom?.toLowerCase() || "";
        const email =
            s.etudiant?.email?.toLowerCase() ||
            s.etudiant?.mail_universitaire?.toLowerCase() ||
            "";

        const searchLower = search.toLowerCase();

        const matchSearch =
            entreprise.includes(searchLower) ||
            sujet.includes(searchLower) ||
            etudiantNom.includes(searchLower) ||
            etudiantPrenom.includes(searchLower) ||
            email.includes(searchLower);

        return matchSearch;
    });
};