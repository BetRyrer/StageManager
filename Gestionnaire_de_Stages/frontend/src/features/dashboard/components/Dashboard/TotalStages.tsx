import StatCard from "./StatCard";
import { useDashboardStat } from "../../hooks/useDashboardStat";

function TotalStages() {
    const count = useDashboardStat("/dashboard", "total");

    return (
        <StatCard
            value={count}
            label="Total des stages"
            color="text-purple-500"
            borderColor="border-purple-500"
        />
    );
}

export default TotalStages;