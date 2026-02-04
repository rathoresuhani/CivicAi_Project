const StatusBadge = ({ status ="pending"}) => {
  const normalized = status.toLowerCase();
  const statusStyle = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    in_progress: "bg-blue-100 text-blue-800 border-blue-200",
    resolved: "bg-green-100 text-green-800 border-green-200",
  }
  const label = normalized === "in_progress"? "In Progress": normalized.charAt(0).toUpperCase()+normalized.slice(1);
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${
        statusStyle[normalized] || "bg-gray-100 text-gray-700 border-gray-200"
      }`}
    >
      {label}
    </span>
  )
};

export default StatusBadge;