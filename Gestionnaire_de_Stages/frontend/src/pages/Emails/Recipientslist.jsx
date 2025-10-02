import Button from "../../components/Buttons/Button";

export default function RecipientsList({ etudiants, selected, setSelected }) {
  return (
    <div className="bg-white shadow rounded-lg p-6 flex flex-col h-full">
      <h2 className="text-lg font-semibold mb-4">Destinataires</h2>

      {/* Stats */}
      <p className="mb-4">
        <span className="font-bold text-red-600">{selected.length}</span>{" "}
        Sélectionnés <br />
        <span className="text-gray-600">{etudiants.length} Total</span>
      </p>

      {/* Liste */}
      <div className="space-y-2 max-h-80 overflow-y-auto mb-4">
        {etudiants.map((d) => (
          <label
            key={d.id}
            className="flex items-center space-x-3 p-2 border rounded hover:bg-gray-50"
          >
            <input
              type="checkbox"
              checked={selected.includes(d.id)}
              onChange={() =>
                setSelected((s) =>
                  s.includes(d.id) ? s.filter((i) => i !== d.id) : [...s, d.id]
                )
              }
            />
            <div>
              <p className="font-medium">
                {d.prenom} {d.nom}
              </p>
              <p className="text-sm text-gray-500">
                {d.mail_universitaire || d.mail_perso}
              </p>
            </div>
          </label>
        ))}
      </div>

      {/* Sélection rapide */}
      <div className="flex justify-between pt-2 border-t">
        <Button
          variant="ghost"
          className="text-red-600"
          onClick={() => setSelected(etudiants.map((d) => d.id))}
        >
          ✓ Tout
        </Button>

        <Button
          variant="ghost"
          className="text-gray-600"
          onClick={() => setSelected([])}
        >
          ✗ Rien
        </Button>
      </div>
    </div>
  );
}
