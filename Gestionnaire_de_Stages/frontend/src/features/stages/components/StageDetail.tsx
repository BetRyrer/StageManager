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
import type { Stage } from "../types/stage";

type StageDetailProps = {
    stage: Stage | null;
    onClose: () => void;
};

const getStatusClasses = (status?: string) => {
    switch (status) {
        case "en_cours":
            return "bg-amber-100 text-amber-800 border border-amber-200";
        case "termines":
            return "bg-emerald-100 text-emerald-800 border border-emerald-200";
        case "attente":
            return "bg-zinc-100 text-zinc-700 border border-zinc-200";
        default:
            return "bg-zinc-100 text-zinc-700 border border-zinc-200";
    }
};

const formatValue = (value?: string | number | null) => {
    if (value === null || value === undefined || value === "") return "—";
    return value;
};

const InfoRow = ({
    label,
    value,
    icon,
}: {
    label: string;
    value?: string | number | null;
    icon?: React.ReactNode;
}) => (
    <div className="flex items-start gap-3 rounded-xl bg-white/70 px-4 py-3">
        {icon ? <div className="mt-0.5 text-zinc-500">{icon}</div> : null}
        <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                {label}
            </p>
            <p className="mt-1 break-words text-sm font-medium text-zinc-900">
                {formatValue(value)}
            </p>
        </div>
    </div>
);

const SectionCard = ({
    title,
    icon,
    children,
}: {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}) => (
    <section className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-zinc-700 shadow-sm">
                {icon}
            </div>
            <h3 className="text-lg font-semibold text-zinc-900">{title}</h3>
        </div>
        <div className="grid gap-3 md:grid-cols-2">{children}</div>
    </section>
);

export default function StageDetail({
    stage,
    onClose,
}: StageDetailProps) {
    if (!stage) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[28px] border border-zinc-200 bg-white shadow-2xl">
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900"
                >
                    <X size={20} />
                </button>

                <div className="border-b border-zinc-200 bg-gradient-to-r from-zinc-50 to-white px-8 py-7">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
                        Détail du stage
                    </p>

                    <div className="pr-12">
                        <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
                            {stage.etudiant.prenom} {stage.etudiant.nom}
                        </h2>

                        <div className="mt-4 flex flex-wrap items-center gap-3">
                            <span
                                className={`rounded-full px-4 py-2 text-sm font-semibold ${getStatusClasses(
                                    stage.status
                                )}`}
                            >
                                {formatValue(stage.status)}
                            </span>

                            <span className="rounded-full bg-zinc-100 px-4 py-2 text-sm text-zinc-700">
                                {formatValue(stage.date_debut)} → {formatValue(stage.date_fin)}
                            </span>

                            <span className="rounded-full bg-zinc-100 px-4 py-2 text-sm text-zinc-700">
                                {formatValue(stage.entreprise?.nom)}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="space-y-6 px-8 py-6">
                    <SectionCard title="Étudiant" icon={<Briefcase size={18} />}>
                        <InfoRow
                            label="Nom complet"
                            value={`${formatValue(stage.etudiant.prenom)} ${formatValue(stage.etudiant.nom)}`}
                            icon={<BadgeInfo size={16} />}
                        />
                        <InfoRow
                            label="Email universitaire"
                            value={stage.etudiant.mail_universitaire}
                            icon={<Mail size={16} />}
                        />
                        <InfoRow
                            label="Téléphone"
                            value={stage.etudiant.tel_portable}
                            icon={<Phone size={16} />}
                        />
                        <InfoRow
                            label="Adresse"
                            value={`${formatValue(stage.etudiant.adresse)}, ${formatValue(
                                stage.etudiant.code_postal
                            )} ${formatValue(stage.etudiant.ville)}`}
                            icon={<MapPin size={16} />}
                        />
                    </SectionCard>

                    <SectionCard title="Entreprise" icon={<Building2 size={18} />}>
                        <InfoRow
                            label="Nom"
                            value={stage.entreprise?.nom}
                            icon={<Building2 size={16} />}
                        />
                        <InfoRow
                            label="SIRET"
                            value={stage.entreprise?.siret}
                            icon={<BadgeInfo size={16} />}
                        />
                        <InfoRow
                            label="Téléphone"
                            value={stage.entreprise?.telephone}
                            icon={<Phone size={16} />}
                        />
                        <InfoRow
                            label="Adresse"
                            value={`${formatValue(stage.entreprise?.adresse)}, ${formatValue(
                                stage.entreprise?.code_postal
                            )} ${formatValue(stage.entreprise?.commune)}`}
                            icon={<MapPin size={16} />}
                        />
                    </SectionCard>

                    <SectionCard title="Tuteur" icon={<Users size={18} />}>
                        <InfoRow
                            label="Nom complet"
                            value={
                                stage.tuteur
                                    ? `${formatValue(stage.tuteur.prenom)} ${formatValue(stage.tuteur.nom)}`
                                    : "Aucun tuteur associé"
                            }
                            icon={<Users size={16} />}
                        />
                        <InfoRow
                            label="Email"
                            value={stage.tuteur?.email}
                            icon={<Mail size={16} />}
                        />
                        <InfoRow
                            label="Téléphone"
                            value={stage.tuteur?.telephone}
                            icon={<Phone size={16} />}
                        />
                        <InfoRow
                            label="Fonction"
                            value={stage.tuteur?.fonction}
                            icon={<BadgeInfo size={16} />}
                        />
                    </SectionCard>

                    <SectionCard title="Informations du stage" icon={<CalendarDays size={18} />}>
                        <InfoRow
                            label="Sujet"
                            value={stage.sujet}
                            icon={<Briefcase size={16} />}
                        />
                        <InfoRow
                            label="Thématique"
                            value={stage.thematique}
                            icon={<BadgeInfo size={16} />}
                        />
                        <InfoRow
                            label="Période"
                            value={`${formatValue(stage.date_debut)} → ${formatValue(stage.date_fin)}`}
                            icon={<CalendarDays size={16} />}
                        />
                        <InfoRow
                            label="Durée"
                            value={
                                stage.duree_stage ? `${stage.duree_stage} jours` : "—"
                            }
                            icon={<CalendarDays size={16} />}
                        />
                        <InfoRow
                            label="Statut"
                            value={stage.status}
                            icon={<BadgeInfo size={16} />}
                        />
                        <InfoRow
                            label="Gratification"
                            value={
                                stage.gratification
                                    ? `${stage.gratification} ${formatValue(stage.unite_gratification)}`
                                    : "—"
                            }
                            icon={<Wallet size={16} />}
                        />
                    </SectionCard>
                </div>

                <div className="flex justify-end border-t border-zinc-200 bg-zinc-50 px-8 py-5">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl bg-zinc-900 px-5 py-2.5 font-medium text-white transition hover:bg-zinc-800"
                    >
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    );
}