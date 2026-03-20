import type { TableColumn } from "react-data-table-component";
import type { Stage } from "../../../../features/stages/types/stage";

const formatDate = (date?: string) => {
    if (!date) return "—";

    const d = new Date(date);
    return isNaN(d.getTime()) ? "—" : d.toLocaleDateString("fr-FR");
};

export const stagesColumns = (
    onView: (row: Stage) => void
): TableColumn<Stage>[] => [
        {
            name: "Étudiant",
            selector: (row) => `${row.etudiant.nom} ${row.etudiant.prenom}`,
            sortable: true,
        },
        {
            name: "Entreprise",
            selector: (row) => row.entreprise?.nom || "—",
            sortable: true,
        },
        {
            name: "Tuteur entreprise",
            selector: (row) =>
                row.tuteur ? `${row.tuteur.prenom} ${row.tuteur.nom}` : "—",
            sortable: true,
        },
        {
            name: "Tuteur UPEC",
            selector: (row) =>
                row.etudiant.tuteurs && row.etudiant.tuteurs.length > 0
                    ? row.etudiant.tuteurs
                        .map((t) => `${t.prenom} ${t.nom}`)
                        .join(", ")
                    : "—",
            sortable: false,
        },
        {
            name: "Date début",
            selector: (row) => formatDate(row.date_debut),
            sortable: true,
        },
        {
            name: "Date fin",
            selector: (row) => formatDate(row.date_fin),
            sortable: true,
        },
        {
            name: "Statut",
            cell: (row) => (
                <span
                    className={`rounded px-2 py-1 text-xs font-medium ${row.status === "en_cours"
                        ? "bg-yellow-100 text-yellow-800"
                        : row.status === "termines"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                >
                    {row.status ?? "—"}
                </span>
            ),
            sortable: true,
            center: true,
        },
        {
            name: "Actions",
            cell: (row) => (
                <button
                    onClick={() => onView(row)}
                    className="rounded bg-red-600 px-3 py-1 text-sm text-white transition hover:bg-red-700"
                >
                    Voir
                </button>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];