import StatCard from "./StatCard";
import { useDashboardStat } from "../../hooks/useDashboardStat";

function Attente() {
    const count = useDashboardStat("/dashboard?status=attente", "attente");

    return (
        <StatCard
            value={count}
            label="En attente validation"
            color="text-orange-500"
            borderColor="border-orange-500"
        />
    );
}

export default Attente;