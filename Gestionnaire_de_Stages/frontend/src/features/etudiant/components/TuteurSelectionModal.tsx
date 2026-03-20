import { X, UserPlus2 } from "lucide-react";
import type { Tuteur } from "../types/tuteur";

interface TuteurSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => Promise<void>;
    tuteurs: Tuteur[];
    loading: boolean;
    saving: boolean;
    selectedIds: number[];
    onToggle: (id: number) => void;
    etudiantNomComplet: string;
    maxSelection?: number;
}

function TuteurSelectionModal({
    isOpen,
    onClose,
    onSave,
    tuteurs,
    loading,
    saving,
    selectedIds,
    onToggle,
    etudiantNomComplet,
    maxSelection = 2,
}: TuteurSelectionModalProps) {
    if (!isOpen) return null;

    const getInitials = (prenom?: string, nom?: string): string =>
        `${prenom?.charAt(0) || ""}${nom?.charAt(0) || ""}`.toUpperCase();

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-3xl overflow-hidden rounded-[28px] border border-zinc-200 bg-white shadow-2xl">
                <button
                    className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900"
                    onClick={onClose}
                >
                    <X size={20} />
                </button>

                <div className="border-b border-zinc-200 bg-gradient-to-r from-zinc-50 to-white px-8 py-6">
                    <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 text-white">
                        <UserPlus2 size={20} />
                    </div>

                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
                        Association
                    </p>

                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
                        Ajouter des tuteurs
                    </h2>

                    <p className="mt-2 text-sm text-zinc-600">
                        Tu peux sélectionner jusqu’à {maxSelection} tuteurs pour{" "}
                        <span className="font-semibold text-zinc-900">{etudiantNomComplet}</span>.
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white">
                            {selectedIds.length}/{maxSelection} sélectionné{selectedIds.length > 1 ? "s" : ""}
                        </span>

                        <span className="rounded-full bg-zinc-100 px-4 py-2 text-sm text-zinc-600">
                            {selectedIds.length >= maxSelection ? "Limite atteinte" : "Sélection disponible"}
                        </span>
                    </div>
                </div>

                <div className="max-h-[65vh] overflow-y-auto px-8 py-6">
                    {loading ? (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <div key={index} className="h-28 animate-pulse rounded-2xl bg-zinc-100" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {tuteurs.map((tuteur) => {
                                const isSelected = selectedIds.includes(tuteur.id);
                                const isDisabled = !isSelected && selectedIds.length >= maxSelection;

                                return (
                                    <button
                                        key={tuteur.id}
                                        type="button"
                                        onClick={() => onToggle(tuteur.id)}
                                        disabled={isDisabled || saving}
                                        className={`relative rounded-2xl border p-5 text-left transition-all duration-200 ${isSelected
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
                                                        <p className="mt-1 text-sm text-zinc-500">Tuteur école</p>
                                                    </div>

                                                    <span
                                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${isSelected
                                                                ? "bg-emerald-500 text-white"
                                                                : "bg-zinc-100 text-zinc-600"
                                                            }`}
                                                    >
                                                        {isSelected ? "Sélectionné" : "Choisir"}
                                                    </span>
                                                </div>

                                                <div className="mt-4">
                                                    {isSelected ? (
                                                        <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                                                            Inclus dans la sélection
                                                        </span>
                                                    ) : isDisabled ? (
                                                        <span className="inline-flex rounded-full bg-zinc-200 px-3 py-1 text-xs font-medium text-zinc-600">
                                                            Limite atteinte
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
                                            <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white">
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
                        Maximum <span className="font-semibold text-zinc-900">{maxSelection} tuteurs</span> par étudiant.
                    </p>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={onClose}
                            disabled={saving}
                            className="rounded-xl border border-zinc-300 bg-white px-5 py-2.5 font-medium text-zinc-700 transition hover:bg-zinc-100"
                        >
                            Annuler
                        </button>

                        <button
                            onClick={onSave}
                            disabled={saving}
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

export default TuteurSelectionModal;