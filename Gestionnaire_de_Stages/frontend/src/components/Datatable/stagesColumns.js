// components/Datatable/stagesColumns.js
export const stagesColumns = [
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
          row.statut === "EN COURS"
            ? "bg-yellow-100 text-yellow-800"
            : row.statut === "TERMINÉ"
            ? "bg-green-100 text-green-800"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        {row.statut}
      </span>
    ),
    sortable: true,
    center: true,
  },
  {
    name: "Actions",
    cell: (row) => (
      <button
        onClick={() => alert(`Voir le stage de ${row.etudiant.nom}`)}
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Voir
      </button>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];
