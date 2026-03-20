import type { RecipientsListProps } from "../types/mail";

export default function RecipientsList({
    etudiants,
    selected,
    setSelected,
}: RecipientsListProps) {
    return (
        <div className="flex h-full flex-col rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-lg font-semibold">Destinataires</h2>

            <p className="mb-4">
                <span className="font-bold text-red-600">{selected.length}</span>{" "}
                Sélectionnés <br />
                <span className="text-gray-600">{etudiants.length} Total</span>
            </p>

            <div className="mb-4 max-h-80 space-y-2 overflow-y-auto">
                {etudiants.map((d) => (
                    <label
                        key={d.id}
                        className="flex items-center space-x-3 rounded border p-2 hover:bg-gray-50 cursor-pointer"
                    >
                        <input
                            type="checkbox"
                            checked={selected.includes(d.id)}
                            onChange={() =>
                                setSelected((prev) =>
                                    prev.includes(d.id)
                                        ? prev.filter((id) => id !== d.id)
                                        : [...prev, d.id]
                                )
                            }
                        />
                        <div>
                            <p className="font-medium">
                                {d.prenom} {d.nom}
                            </p>
                            <p className="text-sm text-gray-500">
                                {d.mail_universitaire || d.mail_perso || "Aucun email"}
                            </p>
                        </div>
                    </label>
                ))}
            </div>

            <div className="flex justify-between border-t pt-2">
                <button
                    type="button"
                    onClick={() => setSelected(etudiants.map((d) => d.id))}
                    className="text-red-600 font-medium hover:underline transition"
                >
                    ✓ Tout
                </button>

                <button
                    type="button"
                    onClick={() => setSelected([])}
                    className="text-gray-600 font-medium hover:underline transition"
                >
                    ✗ Rien
                </button>
            </div>
        </div>
    );
}