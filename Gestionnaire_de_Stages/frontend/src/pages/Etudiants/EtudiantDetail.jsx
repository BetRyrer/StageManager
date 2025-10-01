// components/Datatable/EtudiantDetail.jsx
import { User, Mail, Phone, Home } from "lucide-react";

function EtudiantDetail({ etudiant, onClose }) {
  if (!etudiant) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Détails de {etudiant.nom} {etudiant.prenom}
        </h2>

        {/* Infos principales */}
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
            <User size={20} /> Étudiant
          </h3>
          <p>
            <strong>Nom :</strong> {etudiant.nom}
          </p>
          <p>
            <strong>Prénom :</strong> {etudiant.prenom}
          </p>
          <p className="flex items-center gap-2">
            <Mail size={16} /> {etudiant.mail_universitaire}
          </p>
          <p className="flex items-center gap-2">
            <Phone size={16} /> {etudiant.tel_portable}
          </p>
          <p className="flex items-center gap-2">
            <Home size={16} /> {etudiant.adresse}, {etudiant.code_postal}{" "}
            {etudiant.ville}
          </p>
        </div>

        {/* Autres données BDD si dispo */}
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h3 className="text-lg font-semibold mb-2">📚 Informations</h3>
          <p>
            <strong>Date de naissance :</strong> {etudiant.date_naissance}
          </p>
          <p>
            <strong>Promotion :</strong> {etudiant.promotion}
          </p>
          <p>
            <strong>Status :</strong> {etudiant.status}
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}

export default EtudiantDetail;
