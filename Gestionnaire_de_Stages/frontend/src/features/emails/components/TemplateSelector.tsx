import type { TemplateSelectorProps } from "../types/mail";

export default function TemplateSelector({
    templates,
    selectedTemplate,
    setSelectedTemplate,
}: TemplateSelectorProps) {
    return (
        <div className="mb-6 flex space-x-4">
            {templates.map((t) => (
                <button
                    key={t.key}
                    type="button"
                    onClick={() => setSelectedTemplate(t.key)}
                    className={`rounded px-4 py-2 text-sm font-medium transition ${selectedTemplate === t.key
                            ? `${t.color} ring-2 ring-offset-1 ring-gray-300`
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                >
                    {t.label}
                </button>
            ))}
        </div>
    );
}