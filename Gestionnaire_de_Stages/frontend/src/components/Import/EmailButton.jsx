import { FolderIcon } from "lucide-react";
import { Link } from "react-router-dom";

function ImportButton() {
  return (
    <Link
      to="/mailsender"
      className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow"
    >
      <FolderIcon className="w-4 h-4" />
      Envoyer un mail
    </Link>
  );
}

export default ImportButton;
