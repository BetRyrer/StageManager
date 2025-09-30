// components/Datatable/Datatable.jsx
import DataTable, { createTheme } from "react-data-table-component";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { stagesColumns } from "./stagesColumns";

createTheme("stagesTheme", {
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

const customStyles = {
  headRow: {
    style: {
      background: "linear-gradient(to right, #dc2626, #f97316)",
      color: "#fff",
      fontSize: "14px",
      fontWeight: "bold",
      borderTopLeftRadius: "8px",
      borderTopRightRadius: "8px",
    },
  },
  headCells: {
    style: {
      color: "#fff",
      fontWeight: "600",
    },
  },
  rows: {
    style: {
      minHeight: "55px",
      "&:nth-of-type(odd)": {
        backgroundColor: "#f9fafb",
      },
      "&:hover": {
        backgroundColor: "#f3f4f6",
        transition: "background-color 0.2s ease-in-out",
      },
    },
  },
  pagination: {
    style: {
      borderTop: "1px solid #e5e7eb",
      padding: "10px",
    },
  },
};

function StagesDatatable({ title = "Données" }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    api
      .get("/stages")
      .then((res) => {
        console.log("Réponse API Stages:", res.data);
        setData(res.data);
      })
      .catch((err) => console.error("Erreur API stages:", err));
  }, []);

  return (
    <div className="mt-6 bg-white p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <DataTable
        columns={stagesColumns}
        data={data}
        pagination
        highlightOnHover
        striped
        theme="stagesTheme"
        customStyles={customStyles}
      />
    </div>
  );
}

export default StagesDatatable;
