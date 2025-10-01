export const etudiantsColumns = (onView) => [
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
    name: "Actions",
    cell: (row) => (
      <button
        onClick={() => onView(row)}
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
