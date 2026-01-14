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
    name: "Promotion",
    selector: (row) => row.code_etape,
    sortable: true,
  },
  {
    name: "Tuteur",
    selector: (row) =>
      row.tuteurs && row.tuteurs.length > 0
        ? row.tuteurs.map(t => `${t.prenom} ${t.nom}`).join(", ")
        : "—",
    sortable: false,
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
