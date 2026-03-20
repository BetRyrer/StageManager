import { useState } from "react";
import { FolderIcon } from "lucide-react";
import ImportDelpaaModal from "./ImportDelpaaModal";

function ImportButtonDelpaa() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
      >
        <FolderIcon size={18} />
        Import Delpaa
      </button>

      {open && <ImportDelpaaModal onClose={() => setOpen(false)} />}
    </>
  );
}

export default ImportButtonDelpaa;