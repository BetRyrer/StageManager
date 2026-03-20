import api from "../../../api/axios";
import type { Etudiant, SendMailsPayload } from "../types/mail";

export const mailService = {
    async getEtudiants(): Promise<Etudiant[]> {
        const res = await api.get("/etudiants");
        return res.data;
    },

    async envoyerMails(payload: SendMailsPayload): Promise<void> {
        await api.post("/envoyer-mails", payload);
    },
};