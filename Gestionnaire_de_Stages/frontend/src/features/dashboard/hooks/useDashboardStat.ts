import { useEffect, useState } from "react";
import api from "../../../api/axios";
import type { DashboardResponse } from "../types/dashboard";

export function useDashboardStat(
    endpoint: string,
    key: keyof DashboardResponse
) {
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        api
            .get<DashboardResponse>(endpoint)
            .then((res) => {
                setCount(res.data[key] ?? 0);
            })
            .catch((err) => {
                console.error(`Erreur API ${String(key)}:`, err);
                setCount(0);
            });
    }, [endpoint, key]);

    return count;
}