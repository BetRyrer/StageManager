import { useEffect, useMemo, useState } from "react";
import { etudiantService } from "../services/etudiant.service";
import { tuteurService } from "../services/tuteur.service";
import type { Etudiant } from "../types/etudiant";
import type { Tuteur } from "../types/tuteur";

interface TuteurPopupProps {
    etudiant: Etudiant;
    onClose: () => void;
    onSuccess?: () => void;
}

function TuteurPopup({ etudiant, onClose, onSuccess }: TuteurPopupProps) {
    const [tuteurs, setTuteurs] = useState<Tuteur[]>([]);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [initialSelectedIds, setInitialSelectedIds] = useState<number[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [saving, setSaving] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchTuteurs = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await tuteurService.getEcole();
                setTuteurs(data);

                const existingTuteurs =
                    etudiant.tuteurs?.map((tuteur: Tuteur) => tuteur.id) ?? [];

                const limitedExistingTuteurs = existingTuteurs.slice(0, 2);

                setSelectedIds(limitedExistingTuteurs);
                setInitialSelectedIds(limitedExistingTuteurs);
            } catch (err) {
                console.error(err);
                setError("Impossible de charger les tuteurs.");
            } finally {
                setLoading(false);
            }
        };

        fetchTuteurs();
    }, [etudiant]);

    const remainingSlots = 2 - selectedIds.length;

    const hasChanges = useMemo(() => {
        const sortedCurrent = [...selectedIds].sort((a, b) => a - b);
        const sortedInitial = [...initialSelectedIds].sort((a, b) => a - b);

        return JSON.stringify(sortedCurrent) !== JSON.stringify(sortedInitial);
    }, [selectedIds, initialSelectedIds]);

    const toggleTuteur = (tuteurId: number) => {
        const isSelected = selectedIds.includes(tuteurId);

        if (isSelected) {
            setSelectedIds((prev) => prev.filter((id) => id !== tuteurId));
            return;
        }

        if (selectedIds.length >= 2) {
            return;
        }

        setSelectedIds((prev) => [...prev, tuteurId]);
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            setError("");

            const toAdd = selectedIds.filter(
                (id) => !initialSelectedIds.includes(id)
            );

            if (selectedIds.length > 2) {
                setError("Tu ne peux sélectionner que 2 tuteurs maximum.");
                return;
            }

            for (const tuteurId of toAdd) {
                await etudiantService.addTuteur(etudiant.id, tuteurId);
            }

            if (onSuccess) {
                onSuccess();
            }

            onClose();
        } catch (err: any) {
            console.error(err);
            setError(err?.response?.data?.message || "Erreur lors de l'ajout des tuteurs.");
        } finally {
            setSaving(false);
        }
    };

    const getInitials = (prenom?: string, nom?: string) => {
        return `${prenom?.charAt(0) || ""}${nom?.charAt(0) || ""}`.toUpperCase();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-[2px]">
            <div className="relative w-full max-w-3xl overflow-hidden rounded-[28px] border border-zinc-200 bg-white shadow-2xl">
                <div className="border-b border-zinc-200 bg-gradient-to-r from-zinc-50 to-white px-8 py-6">
                    <button
                        onClick={onClose}
                        className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900"
                    >
                        <span className="text-2xl leading-none">&times;</span>
                    </button>

                    <div className="pr-12">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
                            Association
                        </p>
                        <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
                            Ajouter des tuteurs
                        </h2>
                        <p className="mt-2 text-sm text-zinc-600">
                            Sélectionne jusqu’à 2 tuteurs pour{" "}
                            <span className="font-semibold text-zinc-900">
                                {etudiant.prenom} {etudiant.nom}
                            </span>
                            .
                        </p>

                        <div className="mt-4 flex items-center gap-3">
                            <div className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white">
                                {selectedIds.length}/2 sélectionné{selectedIds.length > 1 ? "s" : ""}
                            </div>

                            <div className="rounded-full bg-zinc-100 px-4 py-2 text-sm text-zinc-600">
                                {remainingSlots > 0
                                    ? `${remainingSlots} place${remainingSlots > 1 ? "s" : ""} restante${remainingSlots > 1 ? "s" : ""}`
                                    : "Limite atteinte"}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-h-[70vh] overflow-y-auto px-8 py-6">
                    {loading ? (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="h-28 animate-pulse rounded-2xl border border-zinc-200 bg-zinc-100"
                                />
                            ))}
                        </div>
                    ) : error ? (
                        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                            {error}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {tuteurs.map((tuteur) => {
                                const isSelected = selectedIds.includes(tuteur.id);
                                const isDisabled = !isSelected && selectedIds.length >= 2;

                                return (
                                    <button
                                        key={tuteur.id}
                                        type="button"
                                        onClick={() => toggleTuteur(tuteur.id)}
                                        disabled={isDisabled || saving}
                                        className={`group relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-200 ${isSelected
                                                ? "border-emerald-300 bg-emerald-50 shadow-md ring-1 ring-emerald-200"
                                                : isDisabled
                                                    ? "cursor-not-allowed border-zinc-200 bg-zinc-50 opacity-50"
                                                    : "border-zinc-200 bg-white hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md"
                                            }`}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div
                                                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-sm font-bold ${isSelected
                                                        ? "bg-emerald-500 text-white"
                                                        : "bg-zinc-100 text-zinc-700"
                                                    }`}
                                            >
                                                {getInitials(tuteur.prenom, tuteur.nom)}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-start justify-between gap-3">
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-zinc-900">
                                                            {tuteur.prenom} {tuteur.nom}
                                                        </h3>
                                                        <p className="mt-1 text-sm text-zinc-500">
                                                            Tuteur école
                                                        </p>
                                                    </div>

                                                    <div
                                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${isSelected
                                                                ? "bg-emerald-500 text-white"
                                                                : "bg-zinc-100 text-zinc-600"
                                                            }`}
                                                    >
                                                        {isSelected ? "Sélectionné" : "Choisir"}
                                                    </div>
                                                </div>

                                                <div className="mt-4 flex items-center gap-2">
                                                    {isSelected ? (
                                                        <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                                                            Inclus dans la sélection
                                                        </span>
                                                    ) : isDisabled ? (
                                                        <span className="inline-flex rounded-full bg-zinc-200 px-3 py-1 text-xs font-medium text-zinc-600">
                                                            Limite de 2 atteinte
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
                                                            Cliquer pour sélectionner
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {isSelected && (
                                            <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white shadow-sm">
                                                ✓
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-3 border-t border-zinc-200 bg-zinc-50 px-8 py-5 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-zinc-500">
                        Tu peux associer au maximum <span className="font-semibold text-zinc-900">2 tuteurs</span> à un étudiant.
                    </p>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={onClose}
                            disabled={saving}
                            className="rounded-xl border border-zinc-300 bg-white px-5 py-2.5 font-medium text-zinc-700 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            Annuler
                        </button>

                        <button
                            onClick={handleSave}
                            disabled={saving || !hasChanges}
                            className="rounded-xl bg-zinc-900 px-5 py-2.5 font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
                        >
                            {saving ? "Enregistrement..." : "Valider la sélection"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TuteurPopup;