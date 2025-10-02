import Button from "../Buttons/Button";

export const stagesColumns = (onView) => [
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
    selector: (row) => new Date(row.date_debut).toLocaleDateString("fr-FR"),
    sortable: true,
  },
  {
    name: "Date fin",
    selector: (row) => new Date(row.date_fin).toLocaleDateString("fr-FR"),
    sortable: true,
  },
  {
    name: "Statut",
    cell: (row) => (
      <span
        className={`px-2 py-1 rounded text-xs font-medium ${
          row.status === "en_cours"
            ? "bg-yellow-100 text-yellow-800"
            : row.status === "terminé"
            ? "bg-green-100 text-green-800"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        {row.status}
      </span>
    ),
    sortable: true,
    center: true,
  },
  {
    name: "Actions",
    cell: (row) => (
      <Button variant="danger" size="sm" onClick={() => onView(row)}>
        Voir
      </Button>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];
