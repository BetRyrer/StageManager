import Button from "../Buttons/Button";

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
      <Button variant="danger" size="sm" onClick={() => onView(row)}>
        Voir
      </Button>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];
