export interface Etudiant {
    nom: string;
    prenom: string;
    mail_universitaire?: string;
    email?: string;
    tel_portable?: string;
    adresse?: string;
    code_postal?: string;
    ville?: string;
    annee?: string;
}

export interface Entreprise {
    nom: string;
    siret?: string;
    adresse?: string;
    code_postal?: string;
    commune?: string;
    telephone?: string;
}

export interface Tuteur {
    nom: string;
    prenom: string;
    email?: string;
    telephone?: string;
    fonction?: string;
}

export interface Stage {
    etudiant: Etudiant;
    entreprise: Entreprise;
    tuteur: Tuteur;
    sujet?: string;
    thematique?: string;
    date_debut?: string;
    date_fin?: string;
    duree_stage?: number;
    status?: string;
    gratification?: string | number;
    unite_gratification?: string;
}