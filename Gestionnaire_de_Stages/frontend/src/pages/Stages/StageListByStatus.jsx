import { useParams } from "react-router-dom";
import { stagesColumns } from "../../components/Datatable/stagesColumns";
import Datatable from "../../components/Datatable/Datatable";
import { useState } from "react";
import StageDetail from "./StageDetail";

function StageListByStatus() {
  const { status } = useParams();
  const [selectedStage, setSelectedStage] = useState(null);
  const [search, setSearch] = useState("");
  const [butYear, setButYear] = useState("");

  const cols = stagesColumns((row) => setSelectedStage(row));

  const statusMapping = {
    actifs: "en_cours",
    attente: "attente",
    termines: "termines",
    total: "",
  };

  const apiUrl = statusMapping[status]
    ? `stages?status=${statusMapping[status]}`
    : "stages";

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
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
        </div>
      </div>

      <Datatable title={`Stages ${status}`} columns={cols} apiUrl={apiUrl} />

      {/* Modal de détail */}
      <StageDetail
        stage={selectedStage}
        onClose={() => setSelectedStage(null)}
      />
    </div>
  );
}

export default StageListByStatus;
