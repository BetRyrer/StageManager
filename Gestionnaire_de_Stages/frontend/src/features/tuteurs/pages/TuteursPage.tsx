import TuteurList from "../components/TuteurList";
import TuteurEtudiants from "../components/TuteurEtudiants";
import { useTuteursEcole } from "../hooks/useTuteursEcole";

const TuteursPage = () => {
    const {
        tuteurs,
        selectedTuteur,
        setSelectedTuteur,
        loading,
        error,
    } = useTuteursEcole();

    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-50 px-6 py-10">
                <div className="mx-auto max-w-7xl">
                    <div className="animate-pulse space-y-6">
                        <div className="h-10 w-64 rounded-xl bg-zinc-200" />
                        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[380px_minmax(0,1fr)]">
                            <div className="space-y-4">
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="h-28 rounded-2xl border border-zinc-200 bg-white"
                                    />
                                ))}
                            </div>
                            <div className="h-[500px] rounded-3xl border border-zinc-200 bg-white" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-zinc-50 px-6 py-10">
                <div className="mx-auto max-w-7xl">
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-600">
                        {error}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-100/70 px-6 py-10">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8">
                    <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
                        Gestion
                    </p>
                    <h1 className="text-4xl font-bold tracking-tight text-zinc-900">
                        Tuteurs école
                    </h1>
                    <p className="mt-2 text-zinc-600">
                        Consulte rapidement les tuteurs et les étudiants qui leur sont associés.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-[380px_minmax(0,1fr)]">
                    <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
                        <div className="mb-5 flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-semibold text-zinc-900">
                                    Liste des tuteurs
                                </h2>
                                <p className="text-sm text-zinc-500">
                                    {tuteurs.length} tuteur(s)
                                </p>
                            </div>
                        </div>

                        <TuteurList
                            tuteurs={tuteurs}
                            selectedTuteur={selectedTuteur}
                            onSelect={setSelectedTuteur}
                        />
                    </div>

                    <TuteurEtudiants tuteur={selectedTuteur} />
                </div>
            </div>
        </div>
    );
};

export default TuteursPage;