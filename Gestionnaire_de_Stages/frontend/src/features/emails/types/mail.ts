import type { Dispatch, SetStateAction } from "react";

export interface Etudiant {
    id: number;
    nom: string;
    prenom: string;
    mail_universitaire?: string | null;
    mail_perso?: string | null;
}

export interface TemplateItem {
    key: string;
    label: string;
    color: string;
}

export interface SendMailsPayload {
    ids: number[];
    type: string;
    subject: string | null;
    body: string | null;
    attachments?: File[];
}

export interface CustomEmailFormProps {
    subject: string;
    setSubject: Dispatch<SetStateAction<string>>;
    body: string;
    setBody: Dispatch<SetStateAction<string>>;
    attachments: File[];
    setAttachments: Dispatch<SetStateAction<File[]>>;
}

export interface RecipientsListProps {
    etudiants: Etudiant[];
    selected: number[];
    setSelected: Dispatch<SetStateAction<number[]>>;
}

export interface TemplateSelectorProps {
    templates: TemplateItem[];
    selectedTemplate: string;
    setSelectedTemplate: Dispatch<SetStateAction<string>>;
}

export interface VariablesInsertProps {
    variables: string[];
    setBody: Dispatch<SetStateAction<string>>;
}