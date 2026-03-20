import StatCard from "./StatCard";
import { useDashboardStat } from "../../hooks/useDashboardStat";

function Termines() {
    const count = useDashboardStat("/dashboard?status=termines", "termines");

    return (
        <StatCard
            value={count}
            label="Stages terminés"
            color="text-green-600"
            borderColor="border-green-600"
        />
    );
}

export default Termines;