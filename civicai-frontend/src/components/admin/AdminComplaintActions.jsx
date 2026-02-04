import {useState} from 'react';

const AdminComplaintSections = ({
  complaintId,
  currentStatus = "pending",
  currentPriority = "medium",
  onUpdateStatus,
  onUpdatePriority,
  loading = false,
}) => {
  const [status, setStatus] = useState(currentStatus);
  const [priority,setPriority] = useState(currentPriority);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
         <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className=" px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-black"
          disabled={loading}
        >
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
        <button
          onClick={() => onUpdateStatus && onUpdateStatus(complaintId, status)}
          disabled={loading}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
            loading
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-900"
          }`}
        >
          Update
        </button>
        <div className="flex items-center gap-2">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className=" px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-black"
          disabled={loading}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button
          onClick={() =>
            onUpdatePriority && onUpdatePriority(complaintId, priority)
          }
          disabled={loading}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
            loading
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-white border border-gray-300 text-black hover:bg-gray-100"
          }`}
        >
          Change
        </button>
        </div>
      </div>
      </div>
  )
};

export default AdminComplaintSections;