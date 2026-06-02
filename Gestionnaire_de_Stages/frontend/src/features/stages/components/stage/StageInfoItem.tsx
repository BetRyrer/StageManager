import type { ReactNode } from "react";

interface Props {
    label: string;
    value?: string | number | null;
    icon?: ReactNode;
}

export default function StageInfoItem({ label, value, icon }: Props) {
    const display =
        value === null || value === undefined || value === "" ? "—" : value;

    return (
        <div className="flex items-start gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2">
            {icon && <span className="mt-[2px] text-zinc-400">{icon}</span>}

            <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-wide text-zinc-500">
                    {label}
                </p>
                <p className="text-sm font-medium text-zinc-900">{display}</p>
            </div>
        </div>
    );
}