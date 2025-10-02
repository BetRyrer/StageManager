import { useEffect, useState } from "react";
import api from "../../services/api";
import TemplateSelector from "./TemplateSelector";
import CustomEmailForm from "./CustomEmailForm";
import VariablesInsert from "./VariablesInsert";
import RecipientsList from "./Recipientslist";
import Button from "../../components/Buttons/Button";
import { useToast } from "../../components/Toasts/ToastProvider";

export default function MailSender() {
  const [selectedTemplate, setSelectedTemplate] = useState("confirmation");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [etudiants, setEtudiants] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);

  const { addToast } = useToast();

  // Récupération des étudiants
  useEffect(() => {
    const fetchEtudiants = async () => {
      try {
        const res = await api.get("/etudiants");
        setEtudiants(res.data);
        setSelected(res.data.map((e) => e.id));
      } catch (err) {
        console.error("Erreur fetch étudiants:", err);
        addToast({
          type: "error",
          title: "Erreur",
          text: "Impossible de charger les étudiants.",
        });
      }
    };
    fetchEtudiants();
  }, [addToast]);

  // Envoi des mails
  const envoyerMails = async () => {
    if (selected.length === 0) {
      addToast({
        type: "error",
        title: "Aucun destinataire",
        text: "Veuillez sélectionner au moins un étudiant.",
      });
      return;
    }

    try {
      setLoading(true);

      addToast({
        type: "loading",
        title: "Envoi en cours",
        text: "Vos emails sont en train d'être envoyés...",
      });

      await api.post("/envoyer-mails", {
        ids: selected,
        type: selectedTemplate,
        subject: selectedTemplate === "custom" ? subject : null,
        body: selectedTemplate === "custom" ? body : null,
      });

      addToast({
        type: "success",
        title: "Succès ✅",
        text: "Les emails ont été envoyés avec succès.",
      });
    } catch (err) {
      console.error("Erreur envoi mails:", err);
      addToast({
        type: "error",
        title: "Erreur ❌",
        text: "Une erreur est survenue lors de l'envoi des mails.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Templates
  const templates = [
    {
      key: "confirmation",
      label: "Début de stage",
      color: "bg-red-100 text-red-600",
    },
    { key: "rappel", label: "Rappel", color: "bg-yellow-100 text-yellow-600" },
    { key: "fin", label: "Fin de stage", color: "bg-green-100 text-green-600" },
    {
      key: "custom",
      label: "Email personnalisé",
      color: "bg-blue-100 text-blue-600",
    },
  ];

  // Variables
  const variables = [
    "{{prenom}}",
    "{{nom}}",
    "{{email}}",
    "{{entreprise}}",
    "{{tuteur}}",
    "{{date_debut}}",
    "{{date_fin}}",
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Titre */}
      <h1 className="text-2xl font-bold text-red-600 mb-2">
        Envoi d'emails groupés
      </h1>
      <p className="text-gray-600 mb-6">
        Créez et envoyez des emails personnalisés à vos étudiants
      </p>

      <div className="grid grid-cols-3 gap-6">
        {/* Zone gauche */}
        <div className="col-span-2 bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Composer votre email</h2>

          {/* Sélecteur de template */}
          <TemplateSelector
            templates={templates}
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
          />

          {/* Email custom */}
          {selectedTemplate === "custom" && (
            <>
              <CustomEmailForm
                subject={subject}
                setSubject={setSubject}
                body={body}
                setBody={setBody}
              />
              <VariablesInsert variables={variables} setBody={setBody} />
            </>
          )}

          {/* Bouton envoi */}
          <div className="flex justify-end space-x-3">
            <Button variant="danger" onClick={envoyerMails} disabled={loading}>
              {loading ? "Envoi..." : "Envoyer maintenant"}
            </Button>
          </div>
        </div>

        {/* Zone droite */}
        <RecipientsList
          etudiants={etudiants}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
    </div>
  );
}
