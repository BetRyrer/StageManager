import { useState } from "react";

function StagesToolbar({ onSearch, onStatusFilter, onYearFilter }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [year, setYear] = useState("all");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    onSearch(value);
  };

  const handleStatusChange = (e) => {
    const value = e.target.value;
    setStatus(value);
    onStatusFilter(value);
  };

  const handleYearChange = (e) => {
    const value = e.target.value;
    setYear(value);
    onYearFilter(value);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="Rechercher..."
        value={search}
        onChange={handleSearchChange}
        className="flex-1 p-2 border rounded-lg shadow-sm focus:ring focus:ring-red-200"
      />

      {/* Filtre Statut */}
      <select
        value={status}
        onChange={handleStatusChange}
        className="p-2 border rounded-lg shadow-sm"
      >
        <option value="all">Tous les statuts</option>
        <option value="en_cours">En cours</option>
        <option value="terminé">Terminé</option>
        <option value="validation">En validation</option>
      </select>

      {/* Filtre Année */}
      <select
        value={year}
        onChange={handleYearChange}
        className="p-2 border rounded-lg shadow-sm"
      >
        <option value="all">Toutes les années</option>
        <option value="2025">2025</option>
        <option value="2024">2024</option>
        <option value="2023">2023</option>
      </select>
    </div>
  );
}

export default StagesToolbar;
