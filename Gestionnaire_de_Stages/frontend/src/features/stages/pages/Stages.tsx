import { useState } from "react";
import { Link } from "react-router-dom";
import { stagesColumns } from "../../../features/datatable/components/columns/stagesColumns";

import Actifs from "../../../features/dashboard/components/Dashboard/EnCours";
import Attente from "../../../features/dashboard/components/Dashboard/Attente";
import Termines from "../../../features/dashboard/components/Dashboard/Termines";
import TotalStages from "../../../features/dashboard/components/Dashboard/TotalStages";
import Datatable from "../../../features/datatable/components/Datatable";
import ImportButtonDelpaa from "../components/ImportButtonDelpaa";
import StageDetail from "../components/StageDetail";
import type { Stage } from "../types/stage";

function Stages() {
    const [selectedStage, setSelectedStage] = useState<Stage | null>(null);
    const [search, setSearch] = useState<string>("");

    const cols = stagesColumns((row: Stage) => setSelectedStage(row));

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="mb-6 flex flex-col gap-4 rounded-xl bg-white p-6 shadow-md sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-2xl font-bold text-red-600">Gestion des stages</h1>

                <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
                    <input
                        type="text"
                        placeholder="Rechercher un stage..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 sm:w-64"
                    />
                    <ImportButtonDelpaa />
                </div>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

            <Datatable
                title="Liste des stages"
                columns={cols}
                apiUrl="stages"
                search={search}
            />

            <StageDetail
                stage={selectedStage}
                onClose={() => setSelectedStage(null)}
            />
        </div>
    );
}

export default Stages;