export interface Etudiant {
    id: number;
    nom: string;
    prenom: string;
    mail_universitaire?: string;
    mail_perso?: string;
}

export interface TemplateItem {
    key: string;
    label: string;
    color: string;
}

export interface CustomEmailFormProps {
    subject: string;
    setSubject: React.Dispatch<React.SetStateAction<string>>;
    body: string;
    setBody: React.Dispatch<React.SetStateAction<string>>;
}

export interface RecipientsListProps {
    etudiants: Etudiant[];
    selected: number[];
    setSelected: React.Dispatch<React.SetStateAction<number[]>>;
}

export interface TemplateSelectorProps {
    templates: TemplateItem[];
    selectedTemplate: string;
    setSelectedTemplate: React.Dispatch<React.SetStateAction<string>>;
}

export interface VariablesInsertProps {
    variables: string[];
    setBody: React.Dispatch<React.SetStateAction<string>>;
}

export interface SendMailsPayload {
    ids: number[];
    type: string;
    subject: string | null;
    body: string | null;
}