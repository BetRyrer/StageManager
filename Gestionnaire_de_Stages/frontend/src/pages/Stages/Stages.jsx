import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "../../components/Toasts/ToastProvider";
import { stagesColumns } from "../../components/Datatable/stagesColumns";

import Actifs from "../../components/Dashboard/Actifs";
import Attente from "../../components/Dashboard/Attente";
import Termines from "../../components/Dashboard/Termines";
import TotalStages from "../../components/Dashboard/TotalStages";
import Datatable from "../../components/Datatable/Datatable";
import ImportButtonDelpaa from "../../components/Import/ImportButtonDelpaa";
import StageDetail from "./StageDetail";

function Stages() {
  const { addToast } = useToast();
  const [selectedStage, setSelectedStage] = useState(null);

  // États fictifs pour recherche et filtre BUT
  const [search, setSearch] = useState("");
  const [butYear, setButYear] = useState("");

  const handleImport = () => {
    addToast({
      type: "loading",
      title: "Import en cours",
      text: "Veuillez patienter, nous traitons le fichier...",
    });
    setTimeout(() => {
      addToast({
        type: "success",
        title: "Import terminé",
        text: "Les données Delpaa ont été importées avec succès ",
      });
    }, 2000);
  };

  const cols = stagesColumns((row) => setSelectedStage(row));

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-red-600">Gestion des stages</h1>

        {/* Recherche + filtre + bouton import */}
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
            <option value="BUT1">2023</option>
            <option value="BUT2">2024</option>
            <option value="BUT3">2025</option>
          </select>

          <ImportButtonDelpaa onClick={handleImport} />
        </div>
      </div>

      {/* Cartes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Link to="/stages/status/actifs">
          <Actifs />
        </Link>

        <Link to="/stages/status/attente">
          <Attente />
        </Link>

        <Link to="/stages/status/termines">
          <Termines />
        </Link>

        <Link to="/stages/status/total">
          <TotalStages />
        </Link>
      </div>

      {/* Tableau */}
      <Datatable
        title="Liste des stages"
        columns={cols}
        apiUrl="stages"
        search={search}
        butYear={butYear}
      />

      {/* Détail stage */}
      <StageDetail
        stage={selectedStage}
        onClose={() => setSelectedStage(null)}
      />
    </div>
  );
}

export default Stages;
