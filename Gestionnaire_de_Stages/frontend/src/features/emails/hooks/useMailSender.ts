import { useEffect, useState } from "react";
import { mailService } from "../services/mail.service";
import type { Etudiant, TemplateItem } from "../types/mail";

export function useMailSender() {
    const [selectedTemplate, setSelectedTemplate] = useState<string>("confirmation");
    const [subject, setSubject] = useState<string>("");
    const [body, setBody] = useState<string>("");
    const [attachments, setAttachments] = useState<File[]>([]);
    const [etudiants, setEtudiants] = useState<Etudiant[]>([]);
    const [selected, setSelected] = useState<number[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchEtudiants = async () => {
            try {
                const data = await mailService.getEtudiants();
                setEtudiants(data);
                setSelected(data.map((e) => e.id));
            } catch (err) {
                console.error("Erreur fetch étudiants :", err);
            }
        };

        fetchEtudiants();
    }, []);

    const envoyerMails = async () => {
        if (selected.length === 0) {
            alert("Veuillez sélectionner au moins un étudiant.");
            return;
        }

        if (selectedTemplate === "custom" && !subject.trim()) {
            alert("Veuillez saisir un objet pour l'email.");
            return;
        }

        if (selectedTemplate === "custom" && !body.trim()) {
            alert("Veuillez saisir un contenu pour l'email.");
            return;
        }

        try {
            setLoading(true);

            await mailService.envoyerMails({
                ids: selected,
                type: selectedTemplate,
                subject: selectedTemplate === "custom" ? subject : null,
                body: selectedTemplate === "custom" ? body : null,
                attachments,
            });

            alert("Emails envoyés avec succès !");
            setAttachments([]);
        } catch (err) {
            console.error("Erreur envoi mails :", err);
            alert("Erreur lors de l'envoi des emails.");
        } finally {
            setLoading(false);
        }
    };

    const templates: TemplateItem[] = [
        {
            key: "confirmation",
            label: "Début de stage",
            color: "bg-red-100 text-red-600",
        },
        {
            key: "rappel",
            label: "Rappel",
            color: "bg-yellow-100 text-yellow-600",
        },
        {
            key: "fin",
            label: "Fin de stage",
            color: "bg-green-100 text-green-600",
        },
        {
            key: "custom",
            label: "Email personnalisé",
            color: "bg-blue-100 text-blue-600",
        },
    ];

    const variables: string[] = [
        "{{prenom}}",
        "{{nom}}",
        "{{email}}",
        "{{entreprise}}",
        "{{tuteur}}",
        "{{date_debut}}",
        "{{date_fin}}",
    ];

    return {
        selectedTemplate,
        setSelectedTemplate,
        subject,
        setSubject,
        body,
        setBody,
        attachments,
        setAttachments,
        etudiants,
        selected,
        setSelected,
        loading,
        envoyerMails,
        templates,
        variables,
    };
}