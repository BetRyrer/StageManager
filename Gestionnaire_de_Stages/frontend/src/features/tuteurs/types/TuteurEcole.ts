export interface Etudiant {
    id: number;
    nom: string;
    prenom: string;
    mail_perso?: string;
    mail_universitaire?: string;
    tel_perso?: string;
    tel_portable?: string;
}

export interface TuteurEcole {
    id: number;
    nom: string;
    prenom: string;
    etudiants: Etudiant[];
}