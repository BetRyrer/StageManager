// components/Dashboard/EnCours.jsx
import { useEffect, useState } from "react";
import api from "../../services/api";
import StatCard from "./StatCard";

function EnCours() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    api
      .get("/dashboard?status=en_cours")
      .then((res) => {
        console.log("Réponse API En cours:", res.data);
        setCount(res.data["en_cours"]);
      })
      .catch((err) => console.error("Erreur API En cours:", err));
  }, []);

  return (
    <StatCard
      value={count}
      label="Stages en cours"
      color="text-yellow-500"
      borderColor="border-yellow-500"
    />
  );
}

export default EnCours;
