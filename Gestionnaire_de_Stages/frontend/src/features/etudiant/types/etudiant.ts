import type { Tuteur } from "./tuteur";

export interface Etudiant {
    id: number;
    nom: string;
    prenom: string;
    mail_universitaire: string;
    tel_portable?: string;
    adresse?: string;
    code_postal?: string;
    ville?: string;
    annee?: string;
    code_etape?: string;
    tuteurs?: Tuteur[];
}

