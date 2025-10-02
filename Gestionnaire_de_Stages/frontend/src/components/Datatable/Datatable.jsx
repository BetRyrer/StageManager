import { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import api from "../../services/api";

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

const customStyles = {
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

function Datatable({ title, columns, apiUrl }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("👉 props.columns reçu par Datatable :", columns);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/${apiUrl}`)
      .then((res) => {
        console.log(`👉 Réponse API /${apiUrl}:`, res.data);
        let result = res.data;

        if (!Array.isArray(result)) {
          if (res.data && typeof res.data === "object") {
            result = res.data[apiUrl] || Object.values(res.data)[0];
          }
        }

        const finalData = Array.isArray(result) ? result : [];
        console.log("👉 Données finales envoyées au tableau :", finalData);
        setData(finalData);
      })
      .catch((err) => {
        console.error("❌ Erreur API:", err);
        setData([]);
      })
      .finally(() => setLoading(false));
  }, [apiUrl]);

  return (
    <div className="mt-6 bg-white p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <DataTable
        columns={columns}
        data={data}
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
