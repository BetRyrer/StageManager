import { useState } from "react";
import { importStages } from "../../services/importService";

function ImportDelpaaModal({ onClose }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImport = async () => {
    if (!file) {
      alert("⚠️ Merci de sélectionner un fichier !");
      return;
    }

    try {
      setLoading(true);
      const result = await importStages(file);

      alert(`✅ Import réussi : ${result.total} lignes importées`);
      console.log("Résultat import:", result);

      onClose();
    } catch (err) {
      alert("❌ Erreur lors de l'import. Vérifie le fichier ou l'API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-[500px] p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Import depuis Delpaa</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Dropzone */}
        <div className="border-2 border-dashed border-red-300 rounded-lg p-6 text-center mb-6">
          <label className="cursor-pointer block">
            <input
              type="file"
              accept=".csv,.xls,.xlsx"
              onChange={handleFileChange}
              hidden
            />
            <div className="flex flex-col items-center gap-2">
              <span className="text-4xl">📂</span>
              <p className="font-medium">Glissez votre fichier ici</p>
              <p className="text-sm text-gray-500">ou cliquez pour parcourir</p>
              <p className="text-xs text-gray-400">
                Formats supportés: CSV, Excel
              </p>
            </div>
          </label>
          {file && <p className="mt-3 text-sm text-green-600">✔ {file.name}</p>}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border hover:bg-gray-100"
            disabled={loading}
          >
            Annuler
          </button>
          <button
            onClick={handleImport}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 disabled:opacity-50"
          >
            {loading ? "Import en cours..." : "Importer"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImportDelpaaModal;
