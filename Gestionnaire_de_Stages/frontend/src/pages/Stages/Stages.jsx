import { useState } from "react";

import Actifs from "../../components/Dashboard/Actifs";
import Attente from "../../components/Dashboard/Attente";
import Termines from "../../components/Dashboard/Termines";

import Datatable from "../../components/Datatable/Datatable";
import { stagesColumns } from "../../components/Datatable/stagesColumns";
import ImportButtonDelpaa from "../../components/Import/ImportButtonDelpaa";
import StageDetail from "./StageDetail";
import { useToast } from "../../components/Toasts/ToastProvider";

function Stages() {
  const { addToast } = useToast();
  const [selectedStage, setSelectedStage] = useState(null);

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
      <div className="bg-white shadow-md rounded-xl p-6 mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-red-600">Gestion des stages</h1>
        <ImportButtonDelpaa onClick={handleImport} />
      </div>

      {/* Cartes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Actifs />
        <Attente />
        <Termines />
      </div>

      {/* Tableau */}
      <Datatable title="Liste des stages" columns={cols} apiUrl="stages" />

      {/* Détail stage */}
      <StageDetail
        stage={selectedStage}
        onClose={() => setSelectedStage(null)}
      />
    </div>
  );
}

export default Stages;
