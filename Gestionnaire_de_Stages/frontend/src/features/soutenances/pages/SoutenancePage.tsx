import React, { useState, useMemo } from 'react';
import { useSoutenances } from '../hooks/useSoutenances';
import CreateSoutenanceModal from '../components/CreateSoutenanceModal';

import {
    getLundisScolaires,
    STATUT_COLORS,
    STATUT_BG,
    STATUT_LABELS,
    type Soutenance,
    type StatutSoutenance,
} from '../types/soutenance';

function toISODate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

function getLundiDeLaSemaine(date: Date): Date {
    const d = new Date(date);
    const jour = d.getDay();
    const diff = jour === 0 ? -6 : 1 - jour;

    d.setDate(d.getDate() + diff);
    d.setHours(0, 0, 0, 0);

    return d;
}

function getSemaineDates(lundi: Date): Date[] {
    return Array.from({ length: 5 }, (_, i) => {
        const d = new Date(lundi);
        d.setDate(d.getDate() + i);
        return d;
    });
}

function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
    });
}

function formatMonthYear(date: Date): string {
    return date.toLocaleDateString('fr-FR', {
        month: 'long',
        year: 'numeric',
    });
}

function formatJourCourt(date: Date): string {
    return date
        .toLocaleDateString('fr-FR', { weekday: 'short' })
        .replace('.', '')
        .toUpperCase();
}

function formatJourNum(date: Date): string {
    return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
    });
}

const StatutBadge: React.FC<{
    statut: StatutSoutenance;
    label: string;
}> = ({ statut, label }) => (
    <span
        style={{
            fontSize: 11,
            fontWeight: 500,
            padding: '2px 8px',
            borderRadius: 999,
            background: STATUT_BG[statut],
            color: STATUT_COLORS[statut],
        }}
    >
        {label}
    </span>
);

const SoutenanceCard: React.FC<{
    s: Soutenance;
    onClick: () => void;
}> = ({ s, onClick }) => (
    <div
        onClick={onClick}
        style={{
            background: STATUT_BG[s.statut],
            borderLeft: `3px solid ${STATUT_COLORS[s.statut]}`,
            borderRadius: 8,
            padding: '8px 10px',
            marginBottom: 6,
            cursor: 'pointer',
        }}
    >
        <div
            style={{
                fontSize: 12,
                fontWeight: 700,
                color: STATUT_COLORS[s.statut],
            }}
        >
            {s.heure_debut} – {s.heure_fin}
        </div>

        <div
            style={{
                fontSize: 12,
                fontWeight: 600,
                color: '#111827',
                marginTop: 3,
            }}
        >
            {s.etudiant.name}
        </div>

        {s.salle && (
            <div
                style={{
                    fontSize: 11,
                    color: '#4b5563',
                    marginTop: 3,
                }}
            >
                🏛 {s.salle}
            </div>
        )}
    </div>
);

const ModalDetail: React.FC<{
    soutenance: Soutenance;
    onClose: () => void;
}> = ({ soutenance: s, onClose }) => (
    <div
        style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(0,0,0,0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}
        onClick={(e) => {
            if (e.target === e.currentTarget) {
                onClose();
            }
        }}
    >
        <div
            style={{
                background: '#ffffff',
                borderRadius: 14,
                padding: '28px 32px',
                width: 480,
                maxWidth: '95vw',
                boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
            }}
        >
            <h2 style={{ marginTop: 0 }}>
                Détail de la soutenance
            </h2>

            <p>{formatDate(s.date_soutenance)}</p>

            <StatutBadge
                statut={s.statut}
                label={s.statut_label}
            />

            <div
                style={{
                    marginTop: 16,
                    display: 'grid',
                    gap: 10,
                }}
            >
                <p>
                    <strong>Étudiant :</strong> {s.etudiant.name}
                </p>

                <p>
                    <strong>Email :</strong> {s.etudiant.email}
                </p>

                <p>
                    <strong>Heure :</strong> {s.heure_debut} –{' '}
                    {s.heure_fin}
                </p>

                <p>
                    <strong>Salle :</strong> {s.salle ?? '—'}
                </p>

                <p>
                    <strong>Titre :</strong> {s.titre_stage ?? '—'}
                </p>

                <p>
                    <strong>Maître de stage :</strong>{' '}
                    {s.maitre_stage ?? '—'}
                </p>

                <p>
                    <strong>Tuteur :</strong>{' '}
                    {s.tuteur?.name ?? '—'}
                </p>

                <p>
                    <strong>Note :</strong>{' '}
                    {s.note !== null ? `${s.note}/20` : '—'}
                </p>
            </div>

            {s.commentaire && (
                <div
                    style={{
                        marginTop: 16,
                        padding: '10px 14px',
                        background: '#f3f4f6',
                        borderRadius: 8,
                        fontSize: 13,
                        color: '#4b5563',
                    }}
                >
                    {s.commentaire}
                </div>
            )}

            <button
                onClick={onClose}
                style={{
                    marginTop: 20,
                    background: '#e32822',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: 8,
                    padding: '10px 16px',
                    cursor: 'pointer',
                }}
            >
                Fermer
            </button>
        </div>
    </div>
);

const SelecteurSemaine: React.FC<{
    lundis: Date[];
    lundiActuel: Date;
    onChange: (lundi: Date) => void;
}> = ({ lundis, lundiActuel, onChange }) => {
    const idx = lundis.findIndex(
        (l) => toISODate(l) === toISODate(lundiActuel)
    );

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                flexWrap: 'wrap',
            }}
        >
            <button
                onClick={() => idx > 0 && onChange(lundis[idx - 1])}
                disabled={idx <= 0}
                style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: 8,
                    background: '#ffffff',
                    padding: '8px 14px',
                    cursor: idx > 0 ? 'pointer' : 'not-allowed',
                    opacity: idx <= 0 ? 0.4 : 1,
                }}
            >
                ←
            </button>

            <div style={{ textAlign: 'center', minWidth: 180 }}>
                <div style={{ fontWeight: 700 }}>
                    Semaine {idx + 1}
                </div>

                <div
                    style={{
                        fontSize: 12,
                        color: '#6b7280',
                    }}
                >
                    {formatMonthYear(lundiActuel)}
                </div>
            </div>

            <button
                onClick={() =>
                    idx < lundis.length - 1 &&
                    onChange(lundis[idx + 1])
                }
                disabled={idx >= lundis.length - 1}
                style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: 8,
                    background: '#ffffff',
                    padding: '8px 14px',
                    cursor:
                        idx < lundis.length - 1
                            ? 'pointer'
                            : 'not-allowed',
                    opacity: idx >= lundis.length - 1 ? 0.4 : 1,
                }}
            >
                →
            </button>

            <button
                onClick={() => onChange(getLundiDeLaSemaine(new Date()))}
                style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: 8,
                    background: '#ffffff',
                    padding: '8px 14px',
                    cursor: 'pointer',
                }}
            >
                Aujourd'hui
            </button>

            <select
                value={toISODate(lundiActuel)}
                onChange={(e) => {
                    const found = lundis.find(
                        (l) => toISODate(l) === e.target.value
                    );

                    if (found) {
                        onChange(found);
                    }
                }}
                style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: 8,
                    padding: '8px 10px',
                    background: '#ffffff',
                    cursor: 'pointer',
                }}
            >
                {lundis.map((l) => (
                    <option
                        key={toISODate(l)}
                        value={toISODate(l)}
                    >
                        Sem. du{' '}
                        {l.toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: 'short',
                        })}
                    </option>
                ))}
            </select>
        </div>
    );
};

const CalendrierHebdo: React.FC<{
    lundi: Date;
    soutenances: Soutenance[];
    onClickSoutenance: (s: Soutenance) => void;
}> = ({ lundi, soutenances, onClickSoutenance }) => {
    const jours = getSemaineDates(lundi);

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
                gap: 1,
                background: '#e5e7eb',
                border: '1px solid #e5e7eb',
                borderRadius: 12,
                overflow: 'hidden',
            }}
        >
            {jours.map((jour) => {
                const dateStr = toISODate(jour);

                const soutenancesJour = soutenances.filter(
                    (s) => s.date_soutenance === dateStr
                );

                return (
                    <div
                        key={dateStr}
                        style={{
                            background: '#ffffff',
                            padding: 14,
                            minHeight: 180,
                        }}
                    >
                        <div
                            style={{
                                marginBottom: 10,
                                borderBottom: '1px solid #f3f4f6',
                                paddingBottom: 8,
                            }}
                        >
                            <div
                                style={{
                                    fontSize: 11,
                                    fontWeight: 700,
                                    color: '#6b7280',
                                }}
                            >
                                {formatJourCourt(jour)}
                            </div>

                            <div
                                style={{
                                    fontSize: 15,
                                    fontWeight: 600,
                                }}
                            >
                                {formatJourNum(jour)}
                            </div>
                        </div>

                        {soutenancesJour.length === 0 ? (
                            <div
                                style={{
                                    color: '#9ca3af',
                                    textAlign: 'center',
                                    marginTop: 30,
                                }}
                            >
                                —
                            </div>
                        ) : (
                            soutenancesJour.map((s) => (
                                <SoutenanceCard
                                    key={s.id}
                                    s={s}
                                    onClick={() =>
                                        onClickSoutenance(s)
                                    }
                                />
                            ))
                        )}

                        {soutenancesJour.length > 0 && (
                            <div
                                style={{
                                    fontSize: 11,
                                    color: '#6b7280',
                                    marginTop: 6,
                                    textAlign: 'right',
                                }}
                            >
                                {soutenancesJour.length} soutenance
                                {soutenancesJour.length > 1 ? 's' : ''}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

const StatCard: React.FC<{
    label: string;
    value: number | string;
    color: string;
}> = ({ label, value, color }) => (
    <div
        style={{
            background: '#ffffff',
            borderTop: `4px solid ${color}`,
            borderRadius: 12,
            padding: 24,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        }}
    >
        <div
            style={{
                fontSize: 28,
                fontWeight: 800,
                color,
            }}
        >
            {value}
        </div>

        <div>{label}</div>
    </div>
);

const SoutenancePage: React.FC = () => {
    const [lundiActuel, setLundiActuel] = useState<Date>(() =>
        getLundiDeLaSemaine(new Date())
    );

    const [showCreate, setShowCreate] = useState(false);

    const [soutenanceSelectionnee, setSoutenanceSelectionnee] =
        useState<Soutenance | null>(null);

    const lundis = useMemo(() => getLundisScolaires(2025), []);

    const {
        soutenances,
        loading,
        error,
        creerSoutenance,
        refetch,
    } = useSoutenances({
        semaine: toISODate(lundiActuel),
        annee_scolaire: 2025,
    });

    const stats = useMemo(
        () => ({
            total: soutenances.length,
            planifiees: soutenances.filter(
                (s) => s.statut === 'planifiee'
            ).length,
            confirmees: soutenances.filter(
                (s) => s.statut === 'confirmee'
            ).length,
            terminees: soutenances.filter(
                (s) => s.statut === 'terminee'
            ).length,
        }),
        [soutenances]
    );

    return (
        <div
            style={{
                background: '#f5f6f8',
                minHeight: '100vh',
                padding: 16,
            }}
        >
            <div
                style={{
                    background: '#ffffff',
                    borderRadius: 14,
                    padding: '22px 24px',
                    marginBottom: 24,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <h1
                    style={{
                        margin: 0,
                        fontSize: 24,
                        fontWeight: 800,
                        color: '#e32822',
                    }}
                >
                    Gestion des soutenances
                </h1>

                <button
                    onClick={() => setShowCreate(true)}
                    style={{
                        background: '#e32822',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 10,
                        padding: '12px 20px',
                        cursor: 'pointer',
                        fontWeight: 700,
                    }}
                >
                    + Ajouter une soutenance
                </button>
            </div>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: 24,
                    marginBottom: 24,
                }}
            >
                <StatCard
                    label="Nombre de soutenances"
                    value={stats.total}
                    color="#eab308"
                />

                <StatCard
                    label="Soutenances planifiées"
                    value={stats.planifiees}
                    color="#f97316"
                />

                <StatCard
                    label="Soutenances confirmées"
                    value={stats.confirmees}
                    color="#10b981"
                />

                <StatCard
                    label="Soutenances terminées"
                    value={stats.terminees}
                    color="#a855f7"
                />
            </div>

            <div
                style={{
                    background: '#ffffff',
                    borderRadius: 14,
                    padding: 24,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                }}
            >
                <div style={{ marginBottom: 20 }}>
                    <SelecteurSemaine
                        lundis={lundis}
                        lundiActuel={lundiActuel}
                        onChange={setLundiActuel}
                    />
                </div>

                <div
                    style={{
                        display: 'flex',
                        gap: 16,
                        marginBottom: 16,
                        flexWrap: 'wrap',
                    }}
                >
                    {(
                        [
                            'planifiee',
                            'confirmee',
                            'terminee',
                            'annulee',
                        ] as StatutSoutenance[]
                    ).map((s) => (
                        <div
                            key={s}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 6,
                            }}
                        >
                            <div
                                style={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: 3,
                                    background: STATUT_COLORS[s],
                                }}
                            />

                            <span
                                style={{
                                    fontSize: 12,
                                    color: '#4b5563',
                                }}
                            >
                                {STATUT_LABELS[s]}
                            </span>
                        </div>
                    ))}
                </div>

                {loading ? (
                    <div
                        style={{
                            textAlign: 'center',
                            padding: '60px 0',
                        }}
                    >
                        Chargement des soutenances…
                    </div>
                ) : error ? (
                    <div
                        style={{
                            textAlign: 'center',
                            padding: '40px 0',
                            color: '#e32822',
                        }}
                    >
                        Erreur : {error}
                    </div>
                ) : (
                    <>
                        <CalendrierHebdo
                            lundi={lundiActuel}
                            soutenances={soutenances}
                            onClickSoutenance={
                                setSoutenanceSelectionnee
                            }
                        />

                        {soutenances.length === 0 && (
                            <div
                                style={{
                                    textAlign: 'center',
                                    padding: '32px 0',
                                    color: '#9ca3af',
                                }}
                            >
                                Aucune soutenance planifiée cette
                                semaine.
                            </div>
                        )}
                    </>
                )}
            </div>

            {showCreate && (
                <CreateSoutenanceModal
                    onClose={() => setShowCreate(false)}
                    onSubmit={async (data) => {
                        await creerSoutenance(data);
                        await refetch();
                    }}
                />
            )}

            {soutenanceSelectionnee && (
                <ModalDetail
                    soutenance={soutenanceSelectionnee}
                    onClose={() =>
                        setSoutenanceSelectionnee(null)
                    }
                />
            )}
        </div>
    );
};

export default SoutenancePage;