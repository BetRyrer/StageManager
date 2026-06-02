import type { ReactNode } from "react";

interface Props {
    title: string;
    icon: ReactNode;
    children: ReactNode;
}

export default function StageSectionCard({ title, icon, children }: Props) {
    return (
        <section className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
            <div className="mb-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-zinc-600">
                    {icon}
                </div>

                <h3 className="text-base font-semibold text-zinc-900">{title}</h3>
            </div>

            <div className="grid gap-2 md:grid-cols-2">{children}</div>
        </section>
    );
}