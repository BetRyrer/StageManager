import type { CustomEmailFormProps } from "../types/mail";

export default function CustomEmailForm({
    subject,
    setSubject,
    body,
    setBody,
}: CustomEmailFormProps) {
    return (
        <>
            <div className="mb-4">
                <label className="mb-1 block font-semibold">Objet de l'email</label>
                <input
                    type="text"
                    className="w-full rounded border px-3 py-2"
                    value={subject}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSubject(e.target.value)
                    }
                    placeholder="Sujet de l'email"
                />
            </div>

            <div className="mb-4">
                <label className="mb-1 block font-semibold">Corps du message</label>
                <textarea
                    rows={10}
                    className="w-full rounded border px-3 py-2"
                    value={body}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setBody(e.target.value)
                    }
                    placeholder="Écrivez le contenu de l'email..."
                />
            </div>
        </>
    );
}