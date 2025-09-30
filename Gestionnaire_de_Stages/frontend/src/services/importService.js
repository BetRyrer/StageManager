import api from "../services/api";

export const importStages = async (file) => {
  const formData = new FormData();
  formData.append("fichier", file);

  try {
    const response = await api.post("/stages/import", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    alert("✅ " + response.data.message);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'import CSV:", error);
    alert("❌ Erreur lors de l'import. Vérifie le fichier ou l'API.");
    throw error;
  }
};
