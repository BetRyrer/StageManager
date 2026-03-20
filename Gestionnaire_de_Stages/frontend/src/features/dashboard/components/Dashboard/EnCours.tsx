import StatCard from "./StatCard";
import { useDashboardStat } from "../../hooks/useDashboardStat";

function EnCours() {
    const count = useDashboardStat("/dashboard?status=en_cours", "en_cours");

    return (
        <StatCard
            value={count}
            label="Stages en cours"
            color="text-yellow-500"
            borderColor="border-yellow-500"
        />
    );
}

export default EnCours;