import CustomEmailForm from "../components/CustomEmailForm";
import RecipientsList from "../components/RecipientsList";
import TemplateSelector from "../components/TemplateSelector";
import VariablesInsert from "../components/VariablesInsert";
import { useMailSender } from "../hooks/useMailSender";

export default function MailSender() {
    const {
        selectedTemplate,
        setSelectedTemplate,
        subject,
        setSubject,
        body,
        setBody,
        etudiants,
        selected,
        setSelected,
        loading,
        envoyerMails,
        templates,
        variables,
    } = useMailSender();

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <h1 className="mb-2 text-2xl font-bold text-red-600">
                Envoi d'emails groupés
            </h1>
            <p className="mb-6 text-gray-600">
                Créez et envoyez des emails personnalisés à vos étudiants
            </p>

            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 rounded-lg bg-white p-6 shadow">
                    <h2 className="mb-4 text-lg font-semibold">
                        Composer votre email
                    </h2>

                    <TemplateSelector
                        templates={templates}
                        selectedTemplate={selectedTemplate}
                        setSelectedTemplate={setSelectedTemplate}
                    />

                    {selectedTemplate === "custom" && (
                        <>
                            <CustomEmailForm
                                subject={subject}
                                setSubject={setSubject}
                                body={body}
                                setBody={setBody}
                            />
                            <VariablesInsert
                                variables={variables}
                                setBody={setBody}
                            />
                        </>
                    )}

                    <div className="flex justify-end space-x-3">
                        <button
                            onClick={envoyerMails}
                            disabled={loading}
                            className={`rounded px-4 py-2 text-white transition ${loading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-red-600 hover:bg-red-700"
                                }`}
                        >
                            {loading ? "Envoi..." : "Envoyer maintenant"}
                        </button>
                    </div>
                </div>

                <RecipientsList
                    etudiants={etudiants}
                    selected={selected}
                    setSelected={setSelected}
                />
            </div>
        </div>
    );
}