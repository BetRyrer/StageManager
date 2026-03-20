import { TuteurEcole } from "../types/TuteurEcole";
import TuteurCard from "./TuteurCard";

interface TuteurListProps {
    tuteurs: TuteurEcole[];
    selectedTuteur: TuteurEcole | null;
    onSelect: (tuteur: TuteurEcole) => void;
}

const TuteurList = ({
    tuteurs,
    selectedTuteur,
    onSelect,
}: TuteurListProps) => {
    return (
        <div className="space-y-3">
            {tuteurs.map((tuteur) => (
                <TuteurCard
                    key={tuteur.id}
                    tuteur={tuteur}
                    isSelected={selectedTuteur?.id === tuteur.id}
                    onClick={() => onSelect(tuteur)}
                />
            ))}
        </div>
    );
};

export default TuteurList;