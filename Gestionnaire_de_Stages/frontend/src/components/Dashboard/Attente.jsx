// components/Dashboard/Attente.jsx
import { useEffect, useState } from "react";
import api from "../../services/api";
import StatCard from "./StatCard";

function Attente() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    api.get("/dashboard?status=attente").then((res) => {
      console.log("Réponse API Attente:", res.data);
      setCount(res.data["attente"]);
    });
  }, []);

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
