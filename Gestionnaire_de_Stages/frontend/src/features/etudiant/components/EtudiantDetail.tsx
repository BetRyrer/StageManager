import { useState } from "react";
import { Home, Mail, Pencil, Phone, Trash2, UserPlus } from "lucide-react";
import { etudiantService } from "../services/etudiant.service";
import { tuteurService } from "../services/tuteur.service";
import { useTuteurSelection } from "../hooks/useTuteurSelection";
import TuteurSelectionModal from "./TuteurSelectionModal";
import type { Etudiant } from "../types/etudiant";
import type { Tuteur } from "../types/tuteur";

interface EtudiantDetailProps {
    etudiant: Etudiant;
    onClose: () => void;
    onDelete: (etudiant: Etudiant) => void;
    onEdit: (etudiant: Etudiant) => void;
}

function EtudiantDetail({
    etudiant,
    onClose,
    onDelete,
    onEdit,
}: EtudiantDetailProps) {
    const [showTuteurPopup, setShowTuteurPopup] = useState(false);
    const [tuteurs, setTuteurs] = useState<Tuteur[]>([]);
    const [loadingTuteurs, setLoadingTuteurs] = useState(false);
    const [savingTuteurs, setSavingTuteurs] = useState(false);

    const {
        selectedIds,
        initialSelectedIds,
        resetSelection,
        toggleSelection,
    } = useTuteurSelection([], 2);

    const loadTuteurs = async (): Promise<void> => {
        try {
            setLoadingTuteurs(true);

            const data = await tuteurService.getAll();
            setTuteurs(data);

            const existingIds = (etudiant.tuteurs ?? [])
                .map((tuteur) => tuteur.id)
                .slice(0, 2);

            resetSelection(existingIds);
        } catch {
            alert("Erreur lors du chargement des tuteurs");
        } finally {
            setLoadingTuteurs(false);
        }
    };

    const openTuteurPopup = async (): Promise<void> => {
        setShowTuteurPopup(true);
        await loadTuteurs();
    };

    const handleSaveTuteurs = async (): Promise<void> => {
        try {
            setSavingTuteurs(true);

            const toAdd = selectedIds.filter(
                (id) => !initialSelectedIds.includes(id)
            );

            for (const tuteurId of toAdd) {
                await etudiantService.addTuteur(etudiant.id, tuteurId);
            }

            alert("Tuteur(s) ajouté(s) avec succès");
            setShowTuteurPopup(false);
        } catch (error: any) {
            alert(error?.response?.data?.message || "Erreur lors de l'ajout du tuteur");
        } finally {
            setSavingTuteurs(false);
        }
    };

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                <div className="relative w-full max-w-2xl rounded-[28px] border border-zinc-200 bg-white p-6 shadow-2xl">
                    <div className="absolute right-4 top-4 flex gap-2">
                        <button
                            onClick={() => onDelete(etudiant)}
                            className="rounded-xl bg-red-600 p-2.5 text-white transition hover:bg-red-700"
                        >
                            <Trash2 size={16} />
                        </button>

                        <button
                            onClick={() => onEdit(etudiant)}
                            className="rounded-xl bg-blue-600 p-2.5 text-white transition hover:bg-blue-700"
                        >
                            <Pencil size={16} />
                        </button>
                    </div>

                    <div className="mb-6">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
                            Étudiant
                        </p>
                        <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
                            {etudiant.prenom} {etudiant.nom}
                        </h2>
                        <p className="mt-2 text-sm text-zinc-500">
                            Consulte les informations et gère les associations.
                        </p>
                    </div>

                    <div className="mb-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
                        <div className="grid gap-4 md:grid-cols-2">
                            <p className="text-sm text-zinc-700">
                                <span className="font-semibold text-zinc-900">Nom :</span> {etudiant.nom}
                            </p>

                            <p className="text-sm text-zinc-700">
                                <span className="font-semibold text-zinc-900">Prénom :</span> {etudiant.prenom}
                            </p>

                            <p className="flex items-center gap-2 text-sm text-zinc-700">
                                <Mail size={16} className="text-zinc-500" />
                                {etudiant.mail_universitaire || "—"}
                            </p>

                            <p className="flex items-center gap-2 text-sm text-zinc-700">
                                <Phone size={16} className="text-zinc-500" />
                                {etudiant.tel_portable || "—"}
                            </p>

                            <p className="flex items-center gap-2 text-sm text-zinc-700 md:col-span-2">
                                <Home size={16} className="text-zinc-500" />
                                {etudiant.adresse || "—"}, {etudiant.code_postal || "—"} {etudiant.ville || "—"}
                            </p>
                        </div>
                    </div>

                    <div className="mb-6 flex flex-wrap gap-3">
                        <button
                            onClick={openTuteurPopup}
                            className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2.5 text-white transition hover:bg-zinc-800"
                        >
                            <UserPlus size={18} />
                            Ajouter un tuteur
                        </button>
                    </div>

                    <div className="flex justify-end">
                        <button
                            onClick={onClose}
                            className="rounded-xl bg-zinc-200 px-4 py-2 text-zinc-800 transition hover:bg-zinc-300"
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            </div>

            <TuteurSelectionModal
                isOpen={showTuteurPopup}
                onClose={() => setShowTuteurPopup(false)}
                onSave={handleSaveTuteurs}
                tuteurs={tuteurs}
                loading={loadingTuteurs}
                saving={savingTuteurs}
                selectedIds={selectedIds}
                onToggle={toggleSelection}
                etudiantNomComplet={`${etudiant.prenom} ${etudiant.nom}`}
                maxSelection={2}
            />
        </>
    );
}

export default EtudiantDetail;