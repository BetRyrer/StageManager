import { Briefcase, Users, Building2 } from "lucide-react";

function Header() {
  return (
    <header className="bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-md">
      <div className=" mx-auto px-6 h-20 grid grid-cols-3 items-center">
        {/* Colonne gauche : Logo + sous-titre en colonne */}
        <div className="flex flex-col leading-tight">
          <span className="text-xl font-bold">StageManager</span>
          <span className="text-xs opacity-80">UPEC - Gestion des stages</span>
        </div>

        {/* Colonne centrale : Navigation */}
        <nav className="flex justify-center space-x-6">
          <a
            href="/stages"
            className="flex items-center space-x-1 hover:opacity-90"
          >
            <Briefcase size={18} /> <span>Gestion stages</span>
          </a>
          <a
            href="/etudiant"
            className="flex items-center space-x-1 hover:opacity-90"
          >
            <Users size={18} /> <span>Étudiants</span>
          </a>
          <a
            href="/Mailsender"
            className="flex items-center space-x-1 hover:opacity-90"
          >
            <Building2 size={18} /> <span>Email</span>
          </a>
        </nav>

        {/*  Profil */}
        <div className="flex items-center justify-end space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-orange-300 flex items-center justify-center font-bold">
              OL
            </div>
            <div className="text-sm leading-tight">
              <p className="font-medium">Oleg Loukianov</p>
              <p className="text-xs opacity-80">Responsable stages</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
