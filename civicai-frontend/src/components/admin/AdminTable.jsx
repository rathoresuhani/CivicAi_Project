import StatusBadge from "../common/StatusBadge";
import Loader from "../common/Loader";
import AdminComplaintActions from "./AdminComplaintActions";

const AdminTable = ({
  complaints = [],
  loading = false,
  onUpdateStatus,
  onUpdatePriority,
  actionLoadingId = null,
  showActions = true,
}) => {
  if (loading) {
    return <Loader text="Loading complaints..." />;
  }

  if (!complaints || complaints.length === 0) {
    return (
      <div className="w-full border border-gray-200 bg-white rounded-xl p-8 text-center text-gray-600">
        No complaints found.
      </div>
    );
  }

  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-base font-semibold text-black">
          {showActions ? "Active Complaints" : "Resolved Complaints"}
        </h2>
        <p className="text-sm text-gray-500">
          Total: <span className="font-semibold">{complaints.length}</span>
        </p>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr className="text-left text-gray-700">
              <th className="px-5 py-3">Complaint ID</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Priority</th>
              <th className="px-5 py-3">Created</th>
              {showActions && <th className="px-5 py-3">Actions</th>}
            </tr>
          </thead>

          <tbody>
            {complaints.map((c) => (
              <tr key={c.complaint_id} className="border-b hover:bg-gray-50">
                <td className="px-5 py-4 font-semibold text-blue-600 underline cursor-pointer whitespace-nowrap">
                  <span
                    onClick={() =>
                      (window.location.href = `/admin/complaints/${c.complaint_id}`)
                    }
                  >
                    {c.complaint_id || "N/A"}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {c.category || "Uncategorized"}
                    </span>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <StatusBadge status={c.status} />
                </td>

                <td className="px-5 py-4 capitalize">
                  {c.priority || "medium"}
                </td>

                <td className="px-5 py-4">
                  {new Date(c.created_at).toLocaleString()}
                </td>

                {showActions && (
                  <td className="px-5 py-4">
                    <AdminComplaintActions
                      complaintId={c.complaint_id}
                      currentStatus={c.status}
                      currentPriority={c.priority || "medium"}
                      onUpdateStatus={onUpdateStatus}
                      onUpdatePriority={onUpdatePriority}
                      loading={actionLoadingId === c.complaint_id}
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTable;
