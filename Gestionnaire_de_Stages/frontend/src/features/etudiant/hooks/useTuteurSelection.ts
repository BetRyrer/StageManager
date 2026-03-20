import { useMemo, useState } from "react";

export function useTuteurSelection(initialIds: number[] = [], maxSelection = 2) {
    const [selectedIds, setSelectedIds] = useState<number[]>(initialIds);
    const [initialSelectedIds, setInitialSelectedIds] = useState<number[]>(initialIds);

    const resetSelection = (ids: number[]) => {
        const limitedIds = ids.slice(0, maxSelection);
        setSelectedIds(limitedIds);
        setInitialSelectedIds(limitedIds);
    };

    const toggleSelection = (id: number) => {
        const isSelected = selectedIds.includes(id);

        if (isSelected) {
            setSelectedIds((prev) => prev.filter((item) => item !== id));
            return;
        }

        if (selectedIds.length >= maxSelection) {
            return;
        }

        setSelectedIds((prev) => [...prev, id]);
    };

    const hasChanges = useMemo(() => {
        const current = [...selectedIds].sort((a, b) => a - b);
        const initial = [...initialSelectedIds].sort((a, b) => a - b);

        return JSON.stringify(current) !== JSON.stringify(initial);
    }, [selectedIds, initialSelectedIds]);

    return {
        selectedIds,
        initialSelectedIds,
        setSelectedIds,
        setInitialSelectedIds,
        resetSelection,
        toggleSelection,
        hasChanges,
        maxSelection,
    };
}