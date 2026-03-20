import type { TableColumn } from "react-data-table-component";
import type { Etudiant } from "../../../etudiant/types/etudiant";

export const etudiantsColumns = (
    onView: (row: Etudiant) => void
): TableColumn<Etudiant>[] => [
        {
            name: "Nom",
            selector: (row) => row.nom,
            sortable: true,
        },
        {
            name: "Prénom",
            selector: (row) => row.prenom,
            sortable: true,
        },
        {
            name: "Email",
            selector: (row) => row.mail_universitaire,
            sortable: true,
        },
        {
            name: "Téléphone",
            selector: (row) => row.tel_portable || "—",
            sortable: true,
        },
        {
            name: "Promotion",
            selector: (row) => row.code_etape || "—",
            sortable: true,
        },
        {
            name: "Tuteur",
            selector: (row) =>
                row.tuteurs && row.tuteurs.length > 0
                    ? row.tuteurs.map((t) => `${t.prenom} ${t.nom}`).join(", ")
                    : "—",
            sortable: false,
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