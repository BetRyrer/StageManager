import { useState } from "react";
import { importStages } from "../../services/importService";
import Button from "../Buttons/Button";
import { useToast } from "../Toasts/ToastProvider";

function ImportDelpaaModal({ onClose }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImport = async () => {
    if (!file) {
      addToast({
        type: "error",
        title: "Fichier manquant",
        text: "⚠️ Merci de sélectionner un fichier avant d'importer.",
      });
      return;
    }

    try {
      setLoading(true);
      const result = await importStages(file);

      addToast({
        type: "success",
        title: "Import terminé ✅",
        text: `${result.total} lignes ont été importées avec succès.`,
      });

      onClose();
    } catch (err) {
      addToast({
        type: "error",
        title: "Erreur d'import ❌",
        text: "Impossible d'importer le fichier. Vérifie son format ou l'API.",
      });
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
          <Button variant="ghost" size="sm" onClick={onClose}>
            ✕
          </Button>
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
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Annuler
          </Button>
          <Button variant="danger" onClick={handleImport} disabled={loading}>
            {loading ? "Import en cours..." : "Importer"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ImportDelpaaModal;
