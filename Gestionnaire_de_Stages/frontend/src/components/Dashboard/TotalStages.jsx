// components/Dashboard/TotalStages.jsx
import { useEffect, useState } from "react";
import api from "../../services/api";
import StatCard from "./StatCard";

function TotalStages() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    api
      .get("/dashboard")
      .then((res) => {
        console.log("Réponse API Total:", res.data);
        setCount(res.data["total"]);
      })
      .catch((err) => console.error("Erreur API Total:", err));
  }, []);

  return (
    <StatCard
      value={count}
      label="Total des stages"
      color="text-purple-500"
      borderColor="border-purple-500"
    />
  );
}

export default TotalStages;
