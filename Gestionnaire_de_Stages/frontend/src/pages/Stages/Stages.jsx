// pages/Stages/Stages.jsx
import { useEffect, useState } from "react";

import Actifs from "../../components/Dashboard/Actifs";
import Attente from "../../components/Dashboard/Attente";
import Termines from "../../components/Dashboard/Termines";
import NoteMoyenne from "../../components/Dashboard/NoteMoyenne";

import api from "../../services/api";
import Datatable from "../../components/Datatable/Datatable";
import { stagesColumns } from "../../components/Datatable/stagesColumns";
import ImportButton from "../../components/Import/ImportButton";

function Stages() {
  const [stages, setStages] = useState([]);

  useEffect(() => {
    api
      .get("/stages")
      .then((res) => setStages(res.data))
      .catch((err) => console.error("Erreur API Stages:", err));
  }, []);

  const handleImport = () => {
    alert("⚡ Import Delpaa lancé !");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-red-600">Gestion des stages</h1>
        <ImportButton onClick={handleImport} />
      </div>
      {/* Cartes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Actifs />
        <Attente />
        <Termines />
        <NoteMoyenne />
      </div>
      {/* Tableau */}
      <Datatable
        title="Liste des stages"
        columns={stagesColumns}
        data={stages}
      />
    </div>
  );
}

export default Stages;
