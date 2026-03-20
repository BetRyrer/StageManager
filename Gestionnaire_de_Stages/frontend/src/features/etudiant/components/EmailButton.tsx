import { FolderIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface EmailButtonProps {
  onClick?: () => void;
  to?: string;
}

function EmailButton({ onClick, to }: EmailButtonProps) {
  const className =
    "flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-white shadow hover:bg-purple-700";

  if (onClick) {
    return (
      <button onClick={onClick} className={className} type="button">
        <FolderIcon className="h-4 w-4" />
        Envoyer un mail
      </button>
    );
  }

  return (
    <Link to={to || "/mailsender"} className={className}>
      <FolderIcon className="h-4 w-4" />
      Envoyer un mail
    </Link>
  );
}

export default EmailButton;