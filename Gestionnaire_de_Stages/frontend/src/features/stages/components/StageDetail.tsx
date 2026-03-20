import { Briefcase, Users, Building2 } from "lucide-react";
import type { Stage } from "../types/stage";

type StageDetailProps = {
    stage: Stage | null;
    onClose: () => void;
};

export default function StageDetail({
    stage,
    onClose,
}: StageDetailProps) {
    if (!stage) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-2xl font-bold text-red-600">
                    Détails du stage de {stage.etudiant.nom} {stage.etudiant.prenom}
                </h2>

                <div className="mb-4 rounded-lg bg-gray-50 p-4">
                    <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold">
                        <Briefcase size={20} />
                        <span>Étudiant</span>
                    </h3>
                    <p>
                        <strong>Nom :</strong> {stage.etudiant.nom} {stage.etudiant.prenom}
                    </p>
                    <p>
                        <strong>Email :</strong> {stage.etudiant.mail_universitaire}
                    </p>
                    <p>
                        <strong>Téléphone :</strong> {stage.etudiant.tel_portable}
                    </p>
                    <p>
                        <strong>Adresse :</strong> {stage.etudiant.adresse},{" "}
                        {stage.etudiant.code_postal} {stage.etudiant.ville}
                    </p>
                </div>

                <div className="mb-4 rounded-lg bg-gray-50 p-4">
                    <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold">
                        <Building2 size={20} />
                        <span>Entreprise</span>
                    </h3>
                    <p>
                        <strong>Nom :</strong> {stage.entreprise.nom}
                    </p>
                    <p>
                        <strong>SIRET :</strong> {stage.entreprise.siret}
                    </p>
                    <p>
                        <strong>Adresse :</strong> {stage.entreprise.adresse},{" "}
                        {stage.entreprise.code_postal} {stage.entreprise.commune}
                    </p>
                    <p>
                        <strong>Téléphone :</strong> {stage.entreprise.telephone}
                    </p>
                </div>

                <div className="mb-4 rounded-lg bg-gray-50 p-4">
                    <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold">
                        <Users size={20} />
                        <span>Tuteur</span>
                    </h3>
                    <p>
                        <strong>Nom :</strong> {stage.tuteur.prenom} {stage.tuteur.nom}
                    </p>
                    <p>
                        <strong>Email :</strong> {stage.tuteur.email}
                    </p>
                    <p>
                        <strong>Téléphone :</strong> {stage.tuteur.telephone}
                    </p>
                    <p>
                        <strong>Fonction :</strong> {stage.tuteur.fonction}
                    </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                    <h3 className="mb-2 text-lg font-semibold">📄 Stage</h3>
                    <p>
                        <strong>Sujet :</strong> {stage.sujet}
                    </p>
                    <p>
                        <strong>Thématique :</strong> {stage.thematique}
                    </p>
                    <p>
                        <strong>Date :</strong> {stage.date_debut} → {stage.date_fin}
                    </p>
                    <p>
                        <strong>Durée :</strong> {stage.duree_stage} jours
                    </p>
                    <p>
                        <strong>Statut :</strong> {stage.status}
                    </p>
                    <p>
                        <strong>Gratification :</strong> {stage.gratification} /{" "}
                        {stage.unite_gratification}
                    </p>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg bg-gray-600 px-4 py-2 text-white transition hover:bg-gray-700"
                    >
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    );
}