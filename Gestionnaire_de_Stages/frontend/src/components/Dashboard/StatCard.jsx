// components/Dashboard/StatCard.jsx
function StatCard({ value, label, color, borderColor, extra }) {
  return (
    <div
      className={`bg-white rounded-xl shadow-md p-6 border-t-4 ${borderColor}`}
    >
      <p className={`text-3xl font-bold ${color}`}>{value}</p>{" "}
      <p className="text-gray-600">{label}</p>
      {extra && <p className="text-sm mt-2">{extra}</p>}
    </div>
  );
}

export default StatCard;
