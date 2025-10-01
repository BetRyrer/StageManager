import { useState } from "react";
import { FolderIcon } from "lucide-react";
import ImportDelpaaModel from "./ImportDelpaaModel";

function ImportButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow"
      >
        <FolderIcon className="w-4 h-4" />
        Envoyer un mail
      </button>

      {open && <ImportDelpaaModel onClose={() => setOpen(false)} />}
    </>
  );
}

export default ImportButton;
