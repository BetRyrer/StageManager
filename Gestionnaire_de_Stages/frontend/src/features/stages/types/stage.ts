export interface Tuteur {
    id: number;
    nom: string;
    prenom: string;
}

export interface Etudiant {
    id?: number;
    nom: string;
    prenom: string;
    mail_universitaire?: string;
    email?: string;
    tel_portable?: string;
    adresse?: string;
    code_postal?: string;
    ville?: string;
    annee?: string;
    code_etape?: string;
    tuteurs?: Tuteur[];
}

export interface Entreprise {
    nom: string;
    siret?: string;
    adresse?: string;
    code_postal?: string;
    commune?: string;
    telephone?: string;
}

export interface TuteurEntreprise {
    id: number;
    nom: string;
    prenom: string;
    email?: string;
    telephone?: string;
    fonction?: string;
    entreprise_id?: number;
}

export interface Stage {
    etudiant: Etudiant;
    entreprise: Entreprise;
    sujet?: string;
    thematique?: string;
    date_debut?: string;
    date_fin?: string;
    duree_stage?: number;
    status?: string;
    gratification?: string | number;
    unite_gratification?: string;
    tuteur?: TuteurEntreprise;
}