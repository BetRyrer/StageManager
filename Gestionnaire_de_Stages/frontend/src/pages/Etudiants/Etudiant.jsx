import { useState, useEffect } from "react";
import api from "../../services/api";

import Datatable from "../../components/Datatable/Datatable";
import { etudiantsColumns } from "../../components/Datatable/etudiantsColumns";
import EmailButton from "../../components/Import/EmailButton";
import EtudiantDetail from "./EtudiantDetail";

function Etudiant() {
  const [etudiants, setEtudiants] = useState([]);
  const [selectedEtudiant, setSelectedEtudiant] = useState(null);

  const [search, setSearch] = useState("");
  const [butYear, setButYear] = useState("");

  /* =========================
     CHARGEMENT DES ÉTUDIANTS
  ========================= */
  useEffect(() => {
    api.get("/etudiants").then((res) => {
      setEtudiants(Array.isArray(res.data) ? res.data : []);
    });
  }, []);

  /* =========================
     SUPPRESSION ÉTUDIANT
  ========================= */
  const handleDeleteEtudiant = async (etudiant) => {
    const confirmDelete = window.confirm(
      `Voulez-vous vraiment supprimer ${etudiant.prenom} ${etudiant.nom} ?`
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/etudiants/${etudiant.id}`);

      // Mise à jour du state
      setEtudiants((prev) =>
        prev.filter((e) => e.id !== etudiant.id)
      );

      // Fermer la modale
      setSelectedEtudiant(null);

      alert("Étudiant supprimé avec succès");
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
        "Erreur lors de la suppression"
      );
    }
  };

  /* =========================
     FILTRAGE
  ========================= */
  const filteredEtudiants = etudiants.filter((e) => {
    const nom = e.nom?.toLowerCase() || "";
    const prenom = e.prenom?.toLowerCase() || "";
    const email = e.email?.toLowerCase() || "";
    const annee = e.annee || "";
    const searchLower = search.toLowerCase();

    const matchSearch =
      nom.includes(searchLower) ||
      prenom.includes(searchLower) ||
      email.includes(searchLower);

    const matchYear = butYear ? annee === butYear : true;

    return matchSearch && matchYear;
  });

  const handleImport = () => {
    alert("Import Delpaa lancé !");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-red-600">
          Gestion des étudiants
        </h1>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Rechercher un étudiant..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          <select
            value={butYear}
            onChange={(e) => setButYear(e.target.value)}
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <option value="">Toutes les années</option>
            <option value="BUT1">BUT 1</option>
            <option value="BUT2">BUT 2</option>
            <option value="BUT3">BUT 3</option>
          </select>

          <EmailButton onClick={handleImport} />
        </div>
      </div>

      {/* Tableau */}
      <Datatable
        title="Liste des étudiants"
        columns={etudiantsColumns((row) => setSelectedEtudiant(row))}
        apiUrl="etudiants"
        dataOverride={filteredEtudiants}
      />

      {/* Modale détails */}
      {selectedEtudiant && (
        <EtudiantDetail
          etudiant={selectedEtudiant}
          onClose={() => setSelectedEtudiant(null)}
          onDelete={handleDeleteEtudiant}
          onEdit={(e) => console.log("EDIT", e)}
        />
      )}
    </div>
  );
}

export default Etudiant;
