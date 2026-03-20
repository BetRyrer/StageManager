import type { ChangeEvent } from "react";

interface AuthInputProps {
    label: string;
    type: string;
    value: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function AuthInput({
    label,
    type,
    value,
    placeholder,
    onChange,
}: AuthInputProps) {
    return (
        <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
                {label}
            </label>

            <input
                type={type}
                required
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="
                    w-full rounded-xl border border-gray-300
                    bg-gray-50 px-4 py-3 text-gray-900
                    transition
                    focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500
                "
            />
        </div>
    );
}