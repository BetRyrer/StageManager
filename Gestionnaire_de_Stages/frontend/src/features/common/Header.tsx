import { Briefcase, Users, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { JSX } from "react";

function Header(): JSX.Element {
  return (
    <header className="bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-md">
      <div className="mx-auto grid h-20 grid-cols-3 items-center px-6">

        {/* Logo */}
        <div className="flex flex-col leading-tight">
          <span className="text-xl font-bold">StageManager</span>
          <span className="text-xs opacity-80">
            UPEC - Gestion des stages
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex justify-center space-x-6">
          <Link
            to="/stages"
            className="flex items-center space-x-1 hover:opacity-90"
          >
            <Briefcase size={18} />
            <span>Gestion stages</span>
          </Link>

          <Link
            to="/etudiant"
            className="flex items-center space-x-1 hover:opacity-90"
          >
            <Users size={18} />
            <span>Étudiants</span>
          </Link>

          <Link
            to="/mailsender"
            className="flex items-center space-x-1 hover:opacity-90"
          >
            <Building2 size={18} />
            <span>Email</span>
          </Link>
        </nav>

        {/* Profil */}
        <div className="flex items-center justify-end space-x-6">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-300 font-bold">
              OL
            </div>
            <div className="text-sm leading-tight">
              <p className="font-medium">Oleg Loukianov</p>
              <p className="text-xs opacity-80">
                Responsable stages
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;