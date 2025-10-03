// pages/Etudiants/Etudiant.jsx
import { useState } from "react";

import Datatable from "../../components/Datatable/Datatable";
import { etudiantsColumns } from "../../components/Datatable/etudiantsColumns";
import EmailButton from "../../components/Import/EmailButton";
import EtudiantDetail from "./EtudiantDetail";

function Etudiant() {
  const [selectedEtudiant, setSelectedEtudiant] = useState(null);

  // États fictifs pour recherche et filtre BUT
  const [search, setSearch] = useState("");
  const [butYear, setButYear] = useState("");

  const handleImport = () => {
    alert("Import Delpaa lancé !");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-red-600">
          Gestion des étudiants
        </h1>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Rechercher un stage..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          <select
            value={butYear}
            onChange={(e) => setButYear(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <option value="">Toutes les années</option>
            <option value="BUT1">BUT 1</option>
            <option value="BUT2">BUT 2</option>
            <option value="BUT3">BUT 3</option>
          </select>
          <EmailButton onClick={handleImport} />
        </div>
      </div>

      {/* Tableau */}
      <Datatable
        title="Liste des étudiants"
        columns={etudiantsColumns((row) => setSelectedEtudiant(row))}
        apiUrl="etudiants"
      />

      {/* Modale détails */}
      <EtudiantDetail
        etudiant={selectedEtudiant}
        onClose={() => setSelectedEtudiant(null)}
      />
    </div>
  );
}

export default Etudiant;
