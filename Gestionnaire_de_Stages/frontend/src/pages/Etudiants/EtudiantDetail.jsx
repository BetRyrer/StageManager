import { useEffect, useState } from "react";
import axios from "../../services/api";
import {
  User,
  Mail,
  Phone,
  Home,
  Trash2,
  Pencil,
  UserPlus,
  X,
} from "lucide-react";
import Button from "../../components/Buttons/Button";

function EtudiantDetail({ etudiant, onClose, onDelete, onEdit }) {
  const [showTuteurPopup, setShowTuteurPopup] = useState(false);
  const [tuteurs, setTuteurs] = useState([]);
  const [loadingTuteurs, setLoadingTuteurs] = useState(false);

  if (!etudiant) return null;

  /* =========================
     CHARGER LES TUTEURS
  ========================= */
  const loadTuteurs = async () => {
    try {
      setLoadingTuteurs(true);
      const res = await axios.get("/tuteurs-all");
      setTuteurs(res.data);
    } catch (error) {
      console.error(error);
      alert("Erreur lors du chargement des tuteurs");
    } finally {
      setLoadingTuteurs(false);
    }
  };

  /* =========================
     AJOUTER UN TUTEUR
  ========================= */
  const ajouterTuteur = async (tuteurId) => {
    try {
      await axios.post(`/etudiants/${etudiant.id}/tuteurs`, {
        tuteur_id: tuteurId,
      });
      alert("Tuteur ajouté avec succès");
      setShowTuteurPopup(false);
      window.location.reload();
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Erreur lors de l'ajout du tuteur"
      );
    }
  };

  /* =========================
     OUVERTURE POPUP
  ========================= */
  const handleOpenTuteurPopup = () => {
    setShowTuteurPopup(true);
    loadTuteurs();
  };

  return (
    <>
      {/* =========================
           MODAL ETUDIANT
      ========================= */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-lg overflow-y-auto max-h-[90vh] relative">

          {/* Actions */}
          <div className="absolute top-4 right-4 flex gap-2">
            <Button variant="danger" onClick={() => onDelete(etudiant)}>
              <Trash2 size={16} />
            </Button>
            <Button variant="primary" onClick={() => onEdit(etudiant)}>
              <Pencil size={16} />
            </Button>
          </div>

          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Détails de {etudiant.nom} {etudiant.prenom}
          </h2>

          {/* Infos étudiant */}
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
              <User size={20} /> Étudiant
            </h3>

            <p><strong>Nom :</strong> {etudiant.nom}</p>
            <p><strong>Prénom :</strong> {etudiant.prenom}</p>

            <p className="flex items-center gap-2">
              <Mail size={16} /> {etudiant.mail_universitaire}
            </p>

            <p className="flex items-center gap-2">
              <Phone size={16} /> {etudiant.tel_portable}
            </p>

            <p className="flex items-center gap-2">
              <Home size={16} />
              {etudiant.adresse}, {etudiant.code_postal} {etudiant.ville}
            </p>
          </div>

          {/* Promotion */}
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h3 className="text-lg font-semibold mb-2">📚 Promotion</h3>
            <p>
              <strong>Promotion :</strong> {etudiant.libelle_etape}
            </p>
          </div>

          {/* Ajouter tuteur */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <Button
              variant="primary"
              onClick={handleOpenTuteurPopup}
              className="flex items-center gap-2"
            >
              <UserPlus size={18} />
              Ajouter un tuteur
            </Button>
          </div>

          <div className="flex justify-end">
            <Button variant="secondary" onClick={onClose}>
              Fermer
            </Button>
          </div>
        </div>
      </div>

      {/* =========================
           POPUP TUTEURS
      ========================= */}
      {showTuteurPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative">

            <button
              className="absolute top-3 right-3"
              onClick={() => setShowTuteurPopup(false)}
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold mb-4">
              Ajouter un tuteur
            </h2>

            {loadingTuteurs ? (
              <p>Chargement...</p>
            ) : (
              <ul className="space-y-2">
                {tuteurs.map((tuteur) => (
                  <li
                    key={tuteur.id}
                    className="flex justify-between items-center border p-2 rounded"
                  >
                    <span>
                      {tuteur.prenom} {tuteur.nom}
                    </span>

                    <Button
                      variant="primary"
                      onClick={() => ajouterTuteur(tuteur.id)}
                    >
                      Ajouter
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default EtudiantDetail;
