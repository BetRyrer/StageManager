import type { TableColumn } from "react-data-table-component";
import type { Stage } from "../../../../features/stages/types/stage";

const formatDate = (date?: string) => {
    if (!date) return "—";

    const d = new Date(date);
    return isNaN(d.getTime())
        ? "—"
        : d.toLocaleDateString("fr-FR");
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
                        : row.status === "terminé"
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
                    className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700 transition"
                >
                    Voir
                </button>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];