import { useState } from "react";
import { createTuteurEcole } from "../services/TuteurEcoleService";

type Props = {
    onCreated?: () => void;
};

const CreateTuteurButton = ({ onCreated }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");

            console.log({
                nom,
                prenom,
            });

            await createTuteurEcole({
                nom,
                prenom,
            });

            setNom("");
            setPrenom("");
            setIsOpen(false);

            if (onCreated) {
                onCreated();
            }
        } catch (err: any) {
            console.error(err.response?.data);

            setError(
                err.response?.data?.message ||
                "Erreur lors de la création du tuteur."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700"
            >
                Ajouter
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
                        <h2 className="mb-1 text-3xl font-bold text-zinc-900">
                            Ajouter un tuteur
                        </h2>

                        <p className="mb-6 text-sm text-zinc-500">
                            Renseigne le nom et le prénom du tuteur école.
                        </p>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-4"
                        >
                            <div>
                                <label className="mb-2 block text-sm font-medium text-zinc-700">
                                    Nom
                                </label>

                                <input
                                    type="text"
                                    value={nom}
                                    onChange={(e) =>
                                        setNom(e.target.value)
                                    }
                                    className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-zinc-700">
                                    Prénom
                                </label>

                                <input
                                    type="text"
                                    value={prenom}
                                    onChange={(e) =>
                                        setPrenom(e.target.value)
                                    }
                                    className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900"
                                    required
                                />
                            </div>

                            {error && (
                                <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
                                    {error}
                                </div>
                            )}

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="rounded-xl border border-zinc-300 px-4 py-2 font-medium text-zinc-700 hover:bg-zinc-100"
                                >
                                    Annuler
                                </button>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="rounded-xl bg-zinc-900 px-4 py-2 font-medium text-white hover:bg-zinc-700 disabled:opacity-50"
                                >
                                    {loading ? "Création..." : "Créer"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default CreateTuteurButton;