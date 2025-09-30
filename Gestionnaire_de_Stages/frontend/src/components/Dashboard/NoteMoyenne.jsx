import { useEffect, useState } from "react";
import axios from "axios";
import StatCard from "./StatCard";

function NoteMoyenne() {
  const [note, setNote] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/stages/note")
      .then((res) => setNote(res.data.moyenne))
      .catch((err) => console.error("Erreur API Note:", err));
  }, []);

  return (
    <StatCard
      value={note}
      label="Note moyenne"
      color="text-blue-600"
      borderColor="border-blue-500"
      extra="+0.3 vs dernière année"
    />
  );
}

export default NoteMoyenne;
