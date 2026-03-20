import { useMemo } from "react";
import DataTable, {
    createTheme,
    type TableStyles,
} from "react-data-table-component";
import type { DatatableProps } from "../types/datatable";
import { useFetchTableData } from "../hooks/useFetchTableData";

createTheme("customTheme", {
    text: {
        primary: "#111827",
        secondary: "#374151",
    },
    background: {
        default: "#ffffff",
    },
    divider: {
        default: "#e5e7eb",
    },
});

const customStyles: TableStyles = {
    headRow: {
        style: {
            background: "linear-gradient(to right, #dc2626, #f97316)",
            color: "#fff",
            fontSize: "14px",
            fontWeight: "bold",
        },
    },
    rows: {
        style: {
            minHeight: "55px",
        },
    },
    pagination: {
        style: {
            borderTop: "1px solid #e5e7eb",
            padding: "10px",
        },
    },
};

function Datatable<T>({
    title,
    columns,
    apiUrl,
    dataOverride,
    search = "",
}: DatatableProps<T>) {
    const { data, loading } = useFetchTableData<T>(apiUrl, dataOverride);

    const filteredData = useMemo(() => {
        if (!search.trim()) return data;

        const lowerSearch = search.toLowerCase();

        return data.filter((item) =>
            JSON.stringify(item).toLowerCase().includes(lowerSearch)
        );
    }, [data, search]);

    return (
        <div className="mt-6 rounded-xl bg-white p-4 shadow">
            <h2 className="mb-4 text-lg font-semibold">{title}</h2>
            <DataTable
                columns={columns}
                data={filteredData}
                pagination
                highlightOnHover
                striped
                progressPending={loading}
                theme="customTheme"
                customStyles={customStyles}
                noDataComponent="Aucune donnée trouvée"
            />
        </div>
    );
}

export default Datatable;