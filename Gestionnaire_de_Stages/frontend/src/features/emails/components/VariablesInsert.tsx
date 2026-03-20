import type { VariablesInsertProps } from "../types/mail";

export default function VariablesInsert({
    variables,
    setBody,
}: VariablesInsertProps) {
    return (
        <div className="mb-6">
            <p className="mb-2 font-semibold">
                Variables (cliquez pour insérer)
            </p>

            <div className="flex flex-wrap gap-2 rounded bg-gray-50 p-3">
                {variables.map((v) => (
                    <button
                        key={v}
                        type="button"
                        onClick={() => setBody((prev) => `${prev} ${v}`)}
                        className="rounded bg-gray-200 px-3 py-1 text-sm text-gray-700 hover:bg-gray-300 transition"
                    >
                        {v}
                    </button>
                ))}
            </div>
        </div>
    );
}