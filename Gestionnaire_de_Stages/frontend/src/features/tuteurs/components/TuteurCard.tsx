import { TuteurEcole } from "../types/TuteurEcole";

interface TuteurCardProps {
    tuteur: TuteurEcole;
    isSelected: boolean;
    onClick: () => void;
}

const getInitials = (prenom: string, nom: string) => {
    return `${prenom?.charAt(0) || ""}${nom?.charAt(0) || ""}`.toUpperCase();
};

const TuteurCard = ({ tuteur, isSelected, onClick }: TuteurCardProps) => {
    const studentCount = tuteur.etudiants?.length || 0;

    return (
        <button
            onClick={onClick}
            className={`group w-full rounded-2xl border p-4 text-left transition-all duration-200 ${isSelected
                ? "border-amber-300 bg-amber-50 shadow-sm ring-1 ring-amber-200"
                : "border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50"
                }`}
        >
            <div className="flex items-start gap-4">
                <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm font-bold ${isSelected
                        ? "bg-amber-200 text-amber-900"
                        : "bg-zinc-100 text-zinc-700"
                        }`}
                >
                    {getInitials(tuteur.prenom, tuteur.nom)}
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <h3 className="line-clamp-2 text-base font-semibold text-zinc-900">
                                {tuteur.prenom} {tuteur.nom}
                            </h3>
                            <p className="mt-1 text-sm text-zinc-500">
                                Tuteur école
                            </p>
                        </div>

                        <span
                            className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${isSelected
                                ? "bg-amber-200 text-amber-900"
                                : "bg-zinc-100 text-zinc-600"
                                }`}
                        >
                            {studentCount} étudiant{studentCount > 1 ? "s" : ""}
                        </span>
                    </div>
                </div>
            </div>
        </button>
    );
};

export default TuteurCard;