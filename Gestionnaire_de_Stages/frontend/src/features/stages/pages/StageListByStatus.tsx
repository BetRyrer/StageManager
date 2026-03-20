import { useParams } from "react-router-dom";
import { stagesColumns } from "../../../features/datatable/components/columns/stagesColumns";
import Datatable from "../../../features/datatable/components/Datatable";
import { useState, useEffect } from "react";
import StageDetail from "../../../features/stages/components/StageDetail";
import { Stage } from "../types/stage";
import {
    getStagesByStatus,
    getStageApiUrlByStatus,
} from "../services/stageService";
import { useStagesFilter } from "../hooks/useStagesFilter";

function StageListByStatus() {
    const { status = "" } = useParams<{ status: string }>();

    const [selectedStage, setSelectedStage] = useState<Stage | null>(null);
    const [stages, setStages] = useState<Stage[]>([]);
    const [search, setSearch] = useState<string>("");

    const cols = stagesColumns((row: Stage) => setSelectedStage(row));

    useEffect(() => {
        const fetchStages = async () => {
            try {
                const data = await getStagesByStatus(status);
                setStages(data);
            } catch (error) {
                console.error("Erreur lors du chargement des stages :", error);
                setStages([]);
            }
        };

        fetchStages();
    }, [status]);

    const filteredStages = useStagesFilter({
        stages,
        search,
    });

    const apiUrl = getStageApiUrlByStatus(status);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="bg-white shadow-md rounded-xl p-6 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-2xl font-bold text-red-600">Gestion des stages</h1>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                    <input
                        type="text"
                        placeholder="Rechercher un stage..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border rounded-lg px-4 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                </div>
            </div>

            <Datatable
                title={`Stages ${status}`}
                columns={cols}
                apiUrl={apiUrl}
                dataOverride={filteredStages}
            />

            <StageDetail
                stage={selectedStage}
                onClose={() => setSelectedStage(null)}
            />
        </div>
    );
}

export default StageListByStatus;