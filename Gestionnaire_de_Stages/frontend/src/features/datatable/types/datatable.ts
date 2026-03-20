import type { TableColumn } from "react-data-table-component";

export interface DatatableProps<T> {
    title: string;
    columns: TableColumn<T>[];
    apiUrl: string;
    dataOverride?: T[];
    search?: string;
}