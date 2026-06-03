// frontend/src/features/soutenances/types/soutenance.ts

export type StatutSoutenance =
    | 'planifiee'
    | 'confirmee'
    | 'terminee'
    | 'annulee';

export interface Etudiant {
    id: number;
    name: string;
    email: string;
}

export interface Tuteur {
    id: number;
    name: string;
}

export interface Soutenance {
    id: number;
    etudiant: Etudiant;
    tuteur: Tuteur | null;
    maitre_stage: string | null;
    date_soutenance: string;
    heure_debut: string;
    heure_fin: string;
    salle: string | null;
    titre_stage: string | null;
    statut: StatutSoutenance;
    statut_label: string;
    note: number | null;
    commentaire: string | null;
}

export interface SoutenancePayload {
    etudiant_id: number;
    date_soutenance: string;
    heure_debut: string;
    heure_fin: string;
    salle?: string;
    titre_stage?: string;
    maitre_stage?: string;
    tuteur_id?: number;
}

export interface SoutenanceFiltres {
    semaine?: string;
    annee_scolaire?: number;
}

export interface SoutenancesResponse {
    data: Soutenance[];
    total: number;
}

export const STATUT_COLORS: Record<StatutSoutenance, string> = {
    planifiee: '#378ADD',
    confirmee: '#1D9E75',
    terminee: '#888780',
    annulee: '#E24B4A',
};

export const STATUT_BG: Record<StatutSoutenance, string> = {
    planifiee: '#E6F1FB',
    confirmee: '#E1F5EE',
    terminee: '#F1EFE8',
    annulee: '#FCEBEB',
};

export const STATUT_LABELS: Record<StatutSoutenance, string> = {
    planifiee: 'Planifiée',
    confirmee: 'Confirmée',
    terminee: 'Terminée',
    annulee: 'Annulée',
};

export function getLundisScolaires(annee: number = 2025): Date[] {
    const debut = new Date(annee, 8, 1);
    const fin = new Date(annee + 1, 7, 31);

    while (debut.getDay() !== 1) {
        debut.setDate(debut.getDate() + 1);
    }

    const lundis: Date[] = [];
    const current = new Date(debut);

    while (current <= fin) {
        lundis.push(new Date(current));
        current.setDate(current.getDate() + 7);
    }

    return lundis;
}