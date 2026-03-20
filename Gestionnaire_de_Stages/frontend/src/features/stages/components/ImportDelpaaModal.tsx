import { useState, type ChangeEvent } from "react";
import { importStages } from "../services/importService";

type Props = {
  onClose: () => void;
};

function ImportDelpaaModal({ onClose }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleImport = async () => {
    if (!file) {
      console.warn("Aucun fichier sélectionné");
      return;
    }

    try {
      setLoading(true);
      await importStages(file);
      onClose();
    } catch (err) {
      console.error("Erreur d'import :", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative w-[500px] rounded-xl bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Import depuis Delpaa</h2>
          <button
            onClick={onClose}
            className="text-lg text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        <div className="mb-6 rounded-lg border-2 border-dashed border-red-300 p-6 text-center">
          <label className="block cursor-pointer">
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
                Formats supportés : CSV, Excel
              </p>
            </div>
          </label>

          {file && <p className="mt-3 text-sm text-green-600">✔ {file.name}</p>}
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-100 disabled:opacity-50"
          >
            Annuler
          </button>

          <button
            onClick={handleImport}
            disabled={loading}
            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? "Import en cours..." : "Importer"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImportDelpaaModal;