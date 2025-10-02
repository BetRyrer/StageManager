import { Briefcase, Users, Building2 } from "lucide-react";
import Button from "../../components/Buttons/Button";

function StageDetail({ stage, onClose }) {
  if (!stage) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-3xl shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Détails du stage de {stage.etudiant.nom} {stage.etudiant.prenom}
        </h2>

        {/* Étudiant */}
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h3 className="text-lg font-semibold flex mb-2 item -center gap-2">
            <Briefcase size={20} /> <span>Stage</span>
          </h3>
          <p>
            <strong>Nom :</strong> {stage.etudiant.nom} {stage.etudiant.prenom}
          </p>
          <p>
            <strong>Email :</strong> {stage.etudiant.mail_universitaire}
          </p>
          <p>
            <strong>Téléphone :</strong> {stage.etudiant.tel_portable}
          </p>
          <p>
            <strong>Adresse :</strong> {stage.etudiant.adresse},{" "}
            {stage.etudiant.code_postal} {stage.etudiant.ville}
          </p>
        </div>

        {/* Entreprise */}
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h3 className="text-lg font-semibold flex mb-2 item -center gap-2">
            <Building2 size={20} /> <span>Entreprise</span>
          </h3>
          <p>
            <strong>Nom :</strong> {stage.entreprise.nom}
          </p>
          <p>
            <strong>SIRET :</strong> {stage.entreprise.siret}
          </p>
          <p>
            <strong>Adresse :</strong> {stage.entreprise.adresse},{" "}
            {stage.entreprise.code_postal} {stage.entreprise.commune}
          </p>
          <p>
            <strong>Téléphone :</strong> {stage.entreprise.telephone}
          </p>
        </div>

        {/* Tuteur */}
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h3 className="text-lg font-semibold flex mb-2 item -center gap-2">
            <Users size={20} /> <span>Tuteur</span>
          </h3>
          <p>
            <strong>Nom :</strong> {stage.tuteur.prenom} {stage.tuteur.nom}
          </p>
          <p>
            <strong>Email :</strong> {stage.tuteur.email}
          </p>
          <p>
            <strong>Téléphone :</strong> {stage.tuteur.telephone}
          </p>
          <p>
            <strong>Fonction :</strong> {stage.tuteur.fonction}
          </p>
        </div>

        {/* Stage */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">📄 Stage</h3>
          <p>
            <strong>Sujet :</strong> {stage.sujet}
          </p>
          <p>
            <strong>Thématique :</strong> {stage.thematique}
          </p>
          <p>
            <strong>Date :</strong> {stage.date_debut} → {stage.date_fin}
          </p>
          <p>
            <strong>Durée :</strong> {stage.duree_stage} jours
          </p>
          <p>
            <strong>Statut :</strong> {stage.status}
          </p>
          <p>
            <strong>Gratification :</strong> {stage.gratification} /{" "}
            {stage.unite_gratification}
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            variant="default"
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white"
          >
            Fermer
          </Button>
        </div>
      </div>
    </div>
  );
}

export default StageDetail;
