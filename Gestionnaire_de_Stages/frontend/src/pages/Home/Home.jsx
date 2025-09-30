// pages/Home/Home.jsx
import Actifs from "../../components/Dashboard/Actifs";
import Attente from "../../components/Dashboard/Attente";
import Termines from "../../components/Dashboard/Termines";
import NoteMoyenne from "../../components/Dashboard/NoteMoyenne";

import { useEffect, useState } from "react";
import api from "../../services/api";
import Datatable from "../../components/Datatable/Datatable";
import { stagesColumns } from "../../components/Datatable/stagesColumns";

function Home() {
  const [stages, setStages] = useState([]);

  useEffect(() => {
    api
      .get("/stages?limit=5")
      .then((res) => setStages(res.data))
      .catch((err) => console.error("Erreur API Stages:", err));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Titre */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-6">
        <h1 className="text-2xl font-bold text-red-600">Tableau de bord</h1>
        <p className="text-gray-600 mt-2">
          Bienvenue dans votre interface de gestion des stages
        </p>
      </div>

      {/* Cartes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Actifs />
        <Attente />
        <Termines />
        <NoteMoyenne />
      </div>

      {/* DataTable */}
      <Datatable title="Stages récents" columns={stagesColumns} data={stages} />
    </div>
  );
}

export default Home;
