import { useEffect, useState } from "react";
import api from "../../../api/axios";

export function useFetchTableData<T>(apiUrl: string, dataOverride?: T[]) {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (dataOverride) {
            setData(dataOverride);
            setLoading(false);
            return;
        }

        setLoading(true);

        api
            .get(`/${apiUrl}`)
            .then((res) => {
                let result = res.data;

                if (!Array.isArray(result) && result && typeof result === "object") {
                    result = result[apiUrl] || Object.values(result)[0];
                }

                const finalData = Array.isArray(result) ? (result as T[]) : [];
                setData(finalData);
            })
            .catch(() => setData([]))
            .finally(() => setLoading(false));
    }, [apiUrl, dataOverride]);

    return { data, loading };
}