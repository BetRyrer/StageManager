// src/pages/MailSender.jsx
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function MailSender() {
  const [selectedTemplate, setSelectedTemplate] = useState("confirmation");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [etudiants, setEtudiants] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);

  // Récupération des étudiants
  useEffect(() => {
    const fetchEtudiants = async () => {
      try {
        const res = await api.get("/etudiants");
        setEtudiants(res.data);
        setSelected(res.data.map((e) => e.id));
      } catch (err) {
        console.error("Erreur fetch étudiants:", err);
      }
    };
    fetchEtudiants();
  }, []);

  // Envoi des mails
  const envoyerMails = async () => {
    if (selected.length === 0) {
      alert("Veuillez sélectionner au moins un étudiant.");
      return;
    }
    try {
      setLoading(true);

      await api.post("/envoyer-mails", {
        ids: selected,
        type: selectedTemplate,
        subject: selectedTemplate === "custom" ? subject : null,
        body: selectedTemplate === "custom" ? body : null,
      });

      alert("✅ Emails envoyés avec succès !");
    } catch (err) {
      console.error("Erreur envoi mails:", err);
      alert("❌ Erreur lors de l'envoi des mails.");
    } finally {
      setLoading(false);
    }
  };

  // Templates disponibles
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

  // Variables dispo pour insertion
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

          {/* Choix du type */}
          <div className="flex space-x-4 mb-6">
            {templates.map((t) => (
              <button
                key={t.key}
                onClick={() => setSelectedTemplate(t.key)}
                className={`px-4 py-2 rounded ${
                  selectedTemplate === t.key
                    ? t.color
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Objet (uniquement si custom) */}
          {selectedTemplate === "custom" && (
            <div className="mb-4">
              <label className="block font-semibold mb-1">
                Objet de l'email
              </label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Sujet de l'email"
              />
            </div>
          )}

          {/* Corps (uniquement si custom) */}
          {selectedTemplate === "custom" && (
            <div className="mb-4">
              <label className="block font-semibold mb-1">
                Corps du message
              </label>
              <textarea
                rows="10"
                className="w-full border rounded px-3 py-2"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Écrivez le contenu de l'email..."
              />
            </div>
          )}

          {/* Variables (uniquement si custom) */}
          {selectedTemplate === "custom" && (
            <div className="mb-6">
              <p className="font-semibold mb-2">
                Variables (cliquez pour insérer)
              </p>
              <div className="flex flex-wrap gap-2 bg-gray-50 p-3 rounded">
                {variables.map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setBody((prev) => prev + " " + v)}
                    className="px-3 py-1 border rounded bg-white shadow-sm text-sm font-mono hover:bg-gray-100"
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Bouton envoi */}
          <div className="flex justify-end space-x-3">
            <button
              onClick={envoyerMails}
              disabled={loading}
              className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50"
            >
              {loading ? "Envoi..." : "Envoyer maintenant"}
            </button>
          </div>
        </div>

        {/* Zone droite */}
        <div className="bg-white shadow rounded-lg p-6 flex flex-col h-full">
          <h2 className="text-lg font-semibold mb-4"> Destinataires</h2>

          {/* Stats */}
          <p className="mb-4">
            <span className="font-bold text-red-600">{selected.length}</span>{" "}
            Sélectionnés <br />
            <span className="text-gray-600">{etudiants.length} Total</span>
          </p>

          {/* Liste destinataires */}
          <div className="space-y-2 max-h-80 overflow-y-auto mb-4">
            {etudiants.map((d) => (
              <label
                key={d.id}
                className="flex items-center space-x-3 p-2 border rounded hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(d.id)}
                  onChange={() =>
                    setSelected((s) =>
                      s.includes(d.id)
                        ? s.filter((i) => i !== d.id)
                        : [...s, d.id]
                    )
                  }
                />
                <div>
                  <p className="font-medium">
                    {d.prenom} {d.nom}
                  </p>
                  <p className="text-sm text-gray-500">
                    {d.mail_universitaire || d.mail_perso}
                  </p>
                </div>
              </label>
            ))}
          </div>

          {/* Sélection rapide */}
          <div className="flex justify-between pt-2 border-t">
            <button
              onClick={() => setSelected(etudiants.map((d) => d.id))}
              className="text-red-600"
            >
              ✓ Tout
            </button>
            <button onClick={() => setSelected([])} className="text-gray-600">
              ✗ Rien
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
