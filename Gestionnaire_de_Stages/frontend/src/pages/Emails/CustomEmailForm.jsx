export default function CustomEmailForm({
  subject,
  setSubject,
  body,
  setBody,
}) {
  return (
    <>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Objet de l'email</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Sujet de l'email"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Corps du message</label>
        <textarea
          rows="10"
          className="w-full border rounded px-3 py-2"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Écrivez le contenu de l'email..."
        />
      </div>
    </>
  );
}
