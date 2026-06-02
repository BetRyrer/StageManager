import {
    Briefcase,
    Users,
    Building2,
    CalendarDays,
    BadgeInfo,
    Mail,
    Phone,
    MapPin,
    Wallet,
    X,
} from "lucide-react";
import StageInfoItem from "./StageInfoItem";
import StageSectionCard from "./StageSectionCard";
import type { Stage } from "../../types/stage";

type StageDetailProps = {
    stage: Stage | null;
    onClose: () => void;
};

const getStatusLabel = (status?: string) => {
    switch (status) {
        case "en_cours":
            return "En cours";
        case "termines":
            return "Terminé";
        case "attente":
            return "En attente";
        default:
            return status || "—";
    }
};

const getStatusClasses = (status?: string) => {
    switch (status) {
        case "en_cours":
            return "bg-amber-50 text-amber-700 border-amber-200";
        case "termines":
            return "bg-emerald-50 text-emerald-700 border-emerald-200";
        case "attente":
            return "bg-zinc-100 text-zinc-700 border-zinc-200";
        default:
            return "bg-zinc-100 text-zinc-700 border-zinc-200";
    }
};

const formatText = (value?: string | number | null) => {
    if (value === null || value === undefined || value === "") return "—";
    return value;
};

const formatDateRange = (start?: string | null, end?: string | null) => {
    if (!start && !end) return "—";
    return `${formatText(start)} → ${formatText(end)}`;
};

export default function StageDetail({
    stage,
    onClose,
}: StageDetailProps) {
    if (!stage) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div className="relative max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-[32px] border border-zinc-200 bg-white shadow-2xl">
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900"
                >
                    <X size={20} />
                </button>

                <div className="border-b border-zinc-200 bg-white px-8 py-8 md:px-10">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
                        Détail du stage
                    </p>

                    <div className="pr-14">
                        <h2 className="text-4xl font-bold tracking-tight text-zinc-950">
                            {stage.etudiant.prenom} {stage.etudiant.nom}
                        </h2>

                        <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
                            Vue complète du stage, de l’entreprise d’accueil, du tuteur et
                            des informations étudiantes.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <span
                                className={`rounded-full border px-4 py-2 text-sm font-semibold ${getStatusClasses(
                                    stage.status
                                )}`}
                            >
                                {getStatusLabel(stage.status)}
                            </span>

                            <span className="rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-700">
                                {formatDateRange(stage.date_debut, stage.date_fin)}
                            </span>

                            <span className="rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm font-medium text-zinc-700">
                                {formatText(stage.entreprise?.nom)}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="space-y-6 px-8 py-8 md:px-10">
                    <StageSectionCard title="Étudiant" icon={<Briefcase size={20} />}>
                        <StageInfoItem
                            label="Nom complet"
                            value={`${formatText(stage.etudiant.prenom)} ${formatText(stage.etudiant.nom)}`}
                            icon={<BadgeInfo size={16} />}
                        />
                        <StageInfoItem
                            label="Email universitaire"
                            value={stage.etudiant.mail_universitaire}
                            icon={<Mail size={16} />}
                        />
                        <StageInfoItem
                            label="Téléphone"
                            value={stage.etudiant.tel_portable}
                            icon={<Phone size={16} />}
                        />
                        <StageInfoItem
                            label="Adresse"
                            value={`${formatText(stage.etudiant.adresse)}, ${formatText(
                                stage.etudiant.code_postal
                            )} ${formatText(stage.etudiant.ville)}`}
                            icon={<MapPin size={16} />}
                        />
                    </StageSectionCard>

                    <StageSectionCard title="Entreprise" icon={<Building2 size={20} />}>
                        <StageInfoItem
                            label="Nom"
                            value={stage.entreprise?.nom}
                            icon={<Building2 size={16} />}
                        />
                        <StageInfoItem
                            label="SIRET"
                            value={stage.entreprise?.siret}
                            icon={<BadgeInfo size={16} />}
                        />
                        <StageInfoItem
                            label="Téléphone"
                            value={stage.entreprise?.telephone}
                            icon={<Phone size={16} />}
                        />
                        <StageInfoItem
                            label="Adresse"
                            value={`${formatText(stage.entreprise?.adresse)}, ${formatText(
                                stage.entreprise?.code_postal
                            )} ${formatText(stage.entreprise?.commune)}`}
                            icon={<MapPin size={16} />}
                        />
                    </StageSectionCard>

                    <StageSectionCard title="Tuteur" icon={<Users size={20} />}>
                        <StageInfoItem
                            label="Nom complet"
                            value={
                                stage.tuteur
                                    ? `${formatText(stage.tuteur.prenom)} ${formatText(stage.tuteur.nom)}`
                                    : "Aucun tuteur associé"
                            }
                            icon={<Users size={16} />}
                        />
                        <StageInfoItem
                            label="Email"
                            value={stage.tuteur?.email}
                            icon={<Mail size={16} />}
                        />
                        <StageInfoItem
                            label="Téléphone"
                            value={stage.tuteur?.telephone}
                            icon={<Phone size={16} />}
                        />
                        <StageInfoItem
                            label="Fonction"
                            value={stage.tuteur?.fonction}
                            icon={<BadgeInfo size={16} />}
                        />
                    </StageSectionCard>

                    <StageSectionCard
                        title="Informations du stage"
                        icon={<CalendarDays size={20} />}
                    >
                        <StageInfoItem
                            label="Sujet"
                            value={stage.sujet}
                            icon={<Briefcase size={16} />}
                        />
                        <StageInfoItem
                            label="Thématique"
                            value={stage.thematique}
                            icon={<BadgeInfo size={16} />}
                        />
                        <StageInfoItem
                            label="Période"
                            value={formatDateRange(stage.date_debut, stage.date_fin)}
                            icon={<CalendarDays size={16} />}
                        />
                        <StageInfoItem
                            label="Durée"
                            value={stage.duree_stage ? `${stage.duree_stage} jours` : "—"}
                            icon={<CalendarDays size={16} />}
                        />
                        <StageInfoItem
                            label="Statut"
                            value={getStatusLabel(stage.status)}
                            icon={<BadgeInfo size={16} />}
                        />
                        <StageInfoItem
                            label="Gratification"
                            value={
                                stage.gratification
                                    ? `${stage.gratification} ${formatText(stage.unite_gratification)}`
                                    : "—"
                            }
                            icon={<Wallet size={16} />}
                        />
                    </StageSectionCard>
                </div>

                <div className="flex justify-end border-t border-zinc-200 bg-white px-8 py-5 md:px-10">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-2xl bg-zinc-900 px-5 py-2.5 font-medium text-white transition hover:bg-zinc-800"
                    >
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    );
}