import { useEffect, useState } from "react";
import api from "../../services/api";
import StatCard from "./StatCard";

function Termines() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    api
      .get("/dashboard?status=terminé")
      .then((res) => {
        console.log("Réponse API Terminés:", res.data);
        setCount(res.data["terminé"]);
      })
      .catch((err) => console.error("Erreur API Terminés:", err));
  }, []);

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
