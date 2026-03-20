interface StatCardProps {
    value: number;
    label: string;
    color: string;
    borderColor: string;
    extra?: string;
}

function StatCard({
    value,
    label,
    color,
    borderColor,
    extra,
}: StatCardProps) {
    return (
        <div className={`rounded-xl border-t-4 bg-white p-6 shadow-md ${borderColor}`}>
            <p className={`text-3xl font-bold ${color}`}>{value}</p>
            <p className="text-gray-600">{label}</p>
            {extra && <p className="mt-2 text-sm">{extra}</p>}
        </div>
    );
}

export default StatCard;