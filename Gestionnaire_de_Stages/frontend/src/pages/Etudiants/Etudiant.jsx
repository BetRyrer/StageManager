// pages/Etudiants/Etudiant.jsx
import { useState } from "react";

import Datatable from "../../components/Datatable/Datatable";
import { etudiantsColumns } from "../../components/Datatable/etudiantsColumns";
import EmailButton from "../../components/Import/EmailButton";
import EtudiantDetail from "./EtudiantDetail";

function Etudiant() {
  const [selectedEtudiant, setSelectedEtudiant] = useState(null);

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
        <EmailButton onClick={handleImport} />
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
