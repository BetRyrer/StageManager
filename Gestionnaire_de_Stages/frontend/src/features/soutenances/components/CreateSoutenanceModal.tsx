import { useState } from "react";
import api from "../../../api/axios";
import type { SoutenancePayload } from "../types/soutenance";

interface Props {
    onClose: () => void;
    onSubmit: (data: SoutenancePayload) => Promise<void>;
}

interface EtudiantSearch {
    id: number;
    nom: string;
    prenom: string;
    mail_universitaire?: string;
    stage?: {
        titre_stage?: string | null;
        maitre_stage?: string | null;
        tuteur?: {
            id: number;
            name: string;
        } | null;
    } | null;
}

export default function CreateSoutenanceModal({ onClose, onSubmit }: Props) {
    const [form, setForm] = useState<SoutenancePayload>({
        etudiant_id: 0,
        date_soutenance: "",
        heure_debut: "",
        heure_fin: "",
        salle: "",
        titre_stage: "",
        maitre_stage: "",
        tuteur_id: undefined,
    });

    const [search, setSearch] = useState("");
    const [etudiants, setEtudiants] = useState<EtudiantSearch[]>([]);
    const [tuteurName, setTuteurName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const inputStyle: React.CSSProperties = {
        width: "100%",
        padding: "10px 12px",
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        fontSize: 14,
        boxSizing: "border-box",
    };

    const rechercherEtudiants = async (value: string) => {
        setSearch(value);

        setForm((prev) => ({
            ...prev,
            etudiant_id: 0,
            titre_stage: "",
            maitre_stage: "",
            tuteur_id: undefined,
        }));

        setTuteurName("");

        if (value.trim().length < 2) {
            setEtudiants([]);
            return;
        }

        try {
            const response = await api.get("/etudiants/search", {
                params: { search: value },
            });

            setEtudiants(response.data.data ?? []);
        } catch {
            setEtudiants([]);
        }
    };

    const choisirEtudiant = (etudiant: EtudiantSearch) => {
        setSearch(`${etudiant.prenom} ${etudiant.nom}`);
        setEtudiants([]);

        setForm((prev) => ({
            ...prev,
            etudiant_id: etudiant.id,
            titre_stage: etudiant.stage?.titre_stage ?? "",
            maitre_stage: etudiant.stage?.maitre_stage ?? "",
            tuteur_id: etudiant.stage?.tuteur?.id,
        }));

        setTuteurName(etudiant.stage?.tuteur?.name ?? "");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!form.etudiant_id) {
            setError("Veuillez sélectionner un étudiant.");
            return;
        }

        try {
            setLoading(true);
            await onSubmit(form);
            onClose();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erreur inconnue");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 1000,
                background: "rgba(0,0,0,0.45)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
        >
            <form
                onSubmit={handleSubmit}
                style={{
                    background: "#ffffff",
                    width: 540,
                    maxWidth: "95vw",
                    borderRadius: 14,
                    padding: 28,
                    boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
                }}
            >
                <h2
                    style={{
                        marginTop: 0,
                        marginBottom: 20,
                        color: "#e32822",
                    }}
                >
                    Ajouter une soutenance
                </h2>

                <div style={{ display: "grid", gap: 12 }}>
                    <div style={{ position: "relative" }}>
                        <input
                            style={inputStyle}
                            type="text"
                            placeholder="Nom ou prénom de l'étudiant"
                            value={search}
                            onChange={(e) => rechercherEtudiants(e.target.value)}
                            required
                        />

                        {etudiants.length > 0 && (
                            <div
                                style={{
                                    position: "absolute",
                                    top: "calc(100% + 4px)",
                                    left: 0,
                                    right: 0,
                                    background: "#ffffff",
                                    border: "1px solid #e5e7eb",
                                    borderRadius: 8,
                                    maxHeight: 220,
                                    overflowY: "auto",
                                    zIndex: 1001,
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                                }}
                            >
                                {etudiants.map((etudiant) => (
                                    <div
                                        key={etudiant.id}
                                        onClick={() => choisirEtudiant(etudiant)}
                                        style={{
                                            padding: "10px 12px",
                                            cursor: "pointer",
                                            borderBottom: "1px solid #f3f4f6",
                                        }}
                                    >
                                        <strong>
                                            {etudiant.prenom} {etudiant.nom}
                                        </strong>

                                        {etudiant.mail_universitaire && (
                                            <div
                                                style={{
                                                    fontSize: 12,
                                                    color: "#6b7280",
                                                    marginTop: 2,
                                                }}
                                            >
                                                {etudiant.mail_universitaire}
                                            </div>
                                        )}

                                        {etudiant.stage?.tuteur?.name && (
                                            <div
                                                style={{
                                                    fontSize: 12,
                                                    color: "#374151",
                                                    marginTop: 2,
                                                }}
                                            >
                                                Tuteur : {etudiant.stage.tuteur.name}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <input
                        style={inputStyle}
                        type="date"
                        value={form.date_soutenance}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                date_soutenance: e.target.value,
                            })
                        }
                        required
                    />

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: 12,
                        }}
                    >
                        <input
                            style={inputStyle}
                            type="time"
                            value={form.heure_debut}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    heure_debut: e.target.value,
                                })
                            }
                            required
                        />

                        <input
                            style={inputStyle}
                            type="time"
                            value={form.heure_fin}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    heure_fin: e.target.value,
                                })
                            }
                            required
                        />
                    </div>

                    <input
                        style={inputStyle}
                        placeholder="Salle"
                        value={form.salle ?? ""}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                salle: e.target.value,
                            })
                        }
                    />

                    <input
                        style={{
                            ...inputStyle,
                            background: "#f9fafb",
                        }}
                        placeholder="Titre du stage"
                        value={form.titre_stage ?? ""}
                        readOnly
                    />

                    <input
                        style={{
                            ...inputStyle,
                            background: "#f9fafb",
                        }}
                        placeholder="Maître de stage"
                        value={form.maitre_stage ?? ""}
                        readOnly
                    />

                    <input
                        style={{
                            ...inputStyle,
                            background: "#f9fafb",
                        }}
                        placeholder="Tuteur pédagogique"
                        value={tuteurName}
                        readOnly
                    />
                </div>

                {error && (
                    <p
                        style={{
                            color: "#e32822",
                            fontSize: 14,
                            marginTop: 12,
                        }}
                    >
                        {error}
                    </p>
                )}

                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 12,
                        marginTop: 24,
                    }}
                >
                    <button
                        type="button"
                        onClick={onClose}
                        style={{
                            padding: "10px 16px",
                            borderRadius: 8,
                            border: "1px solid #e5e7eb",
                            background: "#ffffff",
                            cursor: "pointer",
                        }}
                    >
                        Annuler
                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            padding: "10px 16px",
                            borderRadius: 8,
                            border: "none",
                            background: "#e32822",
                            color: "#ffffff",
                            fontWeight: 700,
                            cursor: "pointer",
                            opacity: loading ? 0.7 : 1,
                        }}
                    >
                        {loading ? "Création..." : "Créer"}
                    </button>
                </div>
            </form>
        </div>
    );
}