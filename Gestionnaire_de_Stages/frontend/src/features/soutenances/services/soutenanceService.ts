// frontend/src/features/soutenances/services/soutenanceService.ts

import type {
    Soutenance,
    SoutenanceFiltres,
    SoutenancePayload,
    SoutenancesResponse,
} from '../types/soutenance';

const API_BASE = '/api/soutenances';

async function apiFetch<T>(
    url: string,
    options: RequestInit = {}
): Promise<T> {
    const token = localStorage.getItem('token');

    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers,
        },
        ...options,
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({
            message: 'Erreur réseau',
        }));

        throw new Error(error.message ?? `Erreur ${response.status}`);
    }

    return response.json();
}

export async function getSoutenances(
    filtres: SoutenanceFiltres = {}
): Promise<SoutenancesResponse> {
    const params = new URLSearchParams();

    if (filtres.semaine) {
        params.set('semaine', filtres.semaine);
    }

    if (filtres.annee_scolaire) {
        params.set('annee_scolaire', String(filtres.annee_scolaire));
    }

    const url = params.toString()
        ? `${API_BASE}?${params.toString()}`
        : API_BASE;

    return apiFetch<SoutenancesResponse>(url);
}

export async function createSoutenance(
    payload: SoutenancePayload
): Promise<Soutenance> {
    const response = await apiFetch<{ data: Soutenance }>(API_BASE, {
        method: 'POST',
        body: JSON.stringify(payload),
    });

    return response.data;
}

export async function updateSoutenance(
    id: number,
    payload: Partial<Soutenance>
): Promise<Soutenance> {
    const response = await apiFetch<{ data: Soutenance }>(
        `${API_BASE}/${id}`,
        {
            method: 'PUT',
            body: JSON.stringify(payload),
        }
    );

    return response.data;
}

export async function deleteSoutenance(id: number): Promise<void> {
    await apiFetch<{ message: string }>(`${API_BASE}/${id}`, {
        method: 'DELETE',
    });
}