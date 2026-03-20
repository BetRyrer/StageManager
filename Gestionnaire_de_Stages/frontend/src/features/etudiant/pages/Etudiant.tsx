import Datatable from "../../datatable/components/Datatable";
import { etudiantsColumns } from "../../datatable/components/columns/etudiantsColumns";
import EmailButton from "../components/EmailButton";
import EtudiantDetail from "../components/EtudiantDetail";
import { useEtudiants } from "../hooks/useEtudiants";
import type { Etudiant as EtudiantType } from "../types/etudiant";

function Etudiant() {
    const {
        filteredEtudiants,
        selectedEtudiant,
        setSelectedEtudiant,
        search,
        setSearch,
        deleteEtudiant,
    } = useEtudiants();

    const handleDeleteEtudiant = async (etudiant: EtudiantType): Promise<void> => {
        const confirmDelete = window.confirm(
            `Voulez-vous vraiment supprimer ${etudiant.prenom} ${etudiant.nom} ?`
        );

        if (!confirmDelete) return;

        const success = await deleteEtudiant(etudiant);

        if (success) {
            alert("Étudiant supprimé avec succès");
        } else {
            alert("Erreur lors de la suppression");
        }
    };

    const handleImport = (): void => {
        alert("Import Delpaa lancé !");
    };

    return (
        <div className="graybg--100 min-h-screen p-6">
            <div className="mb-6 flex items-center justify-between rounded-xl bg-white p-6 shadow-md">
                <h1 className="text-2xl font-bold text-red-600">
                    Gestion des étudiants
                </h1>

                <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
                    <input
                        type="text"
                        placeholder="Rechercher un étudiant..."
                        value={search}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setSearch(e.target.value)
                        }
                        className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 sm:w-64"
                    />
                    <EmailButton onClick={handleImport} />
                </div>
            </div>

            <Datatable<EtudiantType>
                title="Liste des étudiants"
                columns={etudiantsColumns((row) => setSelectedEtudiant(row))}
                apiUrl="etudiants"
                dataOverride={filteredEtudiants}
            />

            {selectedEtudiant && (
                <EtudiantDetail
                    etudiant={selectedEtudiant}
                    onClose={() => setSelectedEtudiant(null)}
                    onDelete={handleDeleteEtudiant}
                    onEdit={(e) => console.log("EDIT", e)}
                />
            )}
        </div>
    );
}

export default Etudiant;