import type { CustomEmailFormProps } from "../types/mail";

export default function CustomEmailForm({
    subject,
    setSubject,
    body,
    setBody,
    attachments,
    setAttachments,
}: CustomEmailFormProps) {
    const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        setAttachments(files);
    };

    const removeAttachment = (indexToRemove: number) => {
        setAttachments((prev) => prev.filter((_, index) => index !== indexToRemove));
    };

    const isImage = (file: File) => file.type.startsWith("image/");
    const isPdf = (file: File) => file.type === "application/pdf";

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

            <div className="mb-4">
                <label className="mb-1 block font-semibold">Pièces jointes</label>
                <input
                    type="file"
                    multiple
                    onChange={handleFilesChange}
                    className="w-full rounded border px-3 py-2"
                />
                <p className="mt-2 text-sm text-gray-500">
                    Vous pouvez ajouter plusieurs fichiers.
                </p>
            </div>

            <div className="mb-4">
                <label className="mb-2 block font-semibold">Prévisualisation des fichiers</label>

                {attachments.length === 0 ? (
                    <div className="rounded border border-dashed p-4 text-sm text-gray-500">
                        Aucun fichier sélectionné
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {attachments.map((file, index) => {
                            const previewUrl = URL.createObjectURL(file);

                            return (
                                <div
                                    key={`${file.name}-${index}`}
                                    className="rounded-lg border bg-gray-50 p-4"
                                >
                                    <div className="mb-3 flex items-start justify-between gap-3">
                                        <div>
                                            <p className="font-medium text-gray-800">{file.name}</p>
                                            <p className="text-sm text-gray-500">
                                                {(file.size / 1024).toFixed(2)} Ko
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                {file.type || "Type inconnu"}
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => removeAttachment(index)}
                                            className="rounded bg-red-100 px-2 py-1 text-sm text-red-600 hover:bg-red-200"
                                        >
                                            Supprimer
                                        </button>
                                    </div>

                                    {isImage(file) && (
                                        <img
                                            src={previewUrl}
                                            alt={file.name}
                                            className="max-h-64 w-full rounded border object-contain bg-white"
                                        />
                                    )}

                                    {isPdf(file) && (
                                        <iframe
                                            src={previewUrl}
                                            title={file.name}
                                            className="h-72 w-full rounded border bg-white"
                                        />
                                    )}

                                    {!isImage(file) && !isPdf(file) && (
                                        <div className="rounded border border-dashed bg-white p-4 text-sm text-gray-500">
                                            Prévisualisation non disponible pour ce type de fichier.
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
}