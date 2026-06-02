import api from "../../../api/axios";
import type { Etudiant, SendMailsPayload } from "../types/mail";

export const mailService = {
    async getEtudiants(): Promise<Etudiant[]> {
        const res = await api.get("/etudiants");
        return res.data;
    },

    async envoyerMails(payload: SendMailsPayload): Promise<void> {
        const formData = new FormData();

        payload.ids.forEach((id) => {
            formData.append("ids[]", String(id));
        });

        formData.append("type", payload.type);

        if (payload.subject !== null) {
            formData.append("subject", payload.subject);
        }

        if (payload.body !== null) {
            formData.append("body", payload.body);
        }

        if (payload.attachments?.length) {
            payload.attachments.forEach((file) => {
                formData.append("attachments[]", file);
            });
        }

        await api.post("/envoyer-mails", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
};