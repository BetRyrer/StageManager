import { TuteurEcole } from "../types/TuteurEcole";

interface TuteurEtudiantsProps {
    tuteur: TuteurEcole | null;
}

const getInitials = (prenom: string, nom: string) => {
    return `${prenom?.charAt(0) || ""}${nom?.charAt(0) || ""}`.toUpperCase();
};

const TuteurEtudiants = ({ tuteur }: TuteurEtudiantsProps) => {
    if (!tuteur) {
        return (
            <div className="flex min-h-[500px] items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-white p-8 text-center">
                <div>
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 text-2xl">
                        👨‍🏫
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-900">
                        Aucun tuteur sélectionné
                    </h3>
                    <p className="mt-2 text-sm text-zinc-500">
                        Clique sur un tuteur à gauche pour afficher les étudiants associés.
                    </p>
                </div>
            </div>
        );
    }

    const count = tuteur.etudiants?.length || 0;

    return (
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-4 border-b border-zinc-200 pb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-900 text-lg font-bold text-white">
                    {getInitials(tuteur.prenom, tuteur.nom)}
                </div>

                <div className="min-w-0">
                    <h2 className="text-2xl font-bold text-zinc-900">
                        {tuteur.prenom} {tuteur.nom}
                    </h2>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-700">
                            Tuteur école
                        </span>
                        <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
                            {count} étudiant{count > 1 ? "s" : ""} associé{count > 1 ? "s" : ""}
                        </span>
                    </div>
                </div>
            </div>

            {count > 0 ? (
                <div>
                    <h3 className="mb-4 text-lg font-semibold text-zinc-900">
                        Étudiants associés
                    </h3>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {tuteur.etudiants.map((etudiant) => (
                            <div
                                key={etudiant.id}
                                className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 transition hover:border-zinc-300 hover:bg-white"
                            >
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-sm font-bold text-zinc-700 shadow-sm">
                                        {getInitials(etudiant.prenom, etudiant.nom)}
                                    </div>

                                    <div className="min-w-0">
                                        <h4 className="truncate text-base font-semibold uppercase tracking-wide text-zinc-900">
                                            {etudiant.prenom} {etudiant.nom}
                                        </h4>
                                    </div>
                                </div>

                                <div className="space-y-2 text-sm text-zinc-600">
                                    {etudiant.mail_universitaire && (
                                        <p className="truncate">
                                            <span className="font-medium text-zinc-800">Mail uni :</span>{" "}
                                            {etudiant.mail_universitaire}
                                        </p>
                                    )}

                                    {etudiant.mail_perso && (
                                        <p className="truncate">
                                            <span className="font-medium text-zinc-800">Mail perso :</span>{" "}
                                            {etudiant.mail_perso}
                                        </p>
                                    )}

                                    {etudiant.tel_portable && (
                                        <p>
                                            <span className="font-medium text-zinc-800">Téléphone :</span>{" "}
                                            {etudiant.tel_portable}
                                        </p>
                                    )}

                                    {!etudiant.mail_universitaire &&
                                        !etudiant.mail_perso &&
                                        !etudiant.tel_portable && (
                                            <p className="text-zinc-400">
                                                Aucune information complémentaire.
                                            </p>
                                        )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex min-h-[260px] items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-8 text-center">
                    <div>
                        <div className="mb-3 text-3xl">📚</div>
                        <h3 className="text-lg font-semibold text-zinc-900">
                            Aucun étudiant associé
                        </h3>
                        <p className="mt-2 text-sm text-zinc-500">
                            Ce tuteur n’a pas encore d’étudiant rattaché.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TuteurEtudiants;