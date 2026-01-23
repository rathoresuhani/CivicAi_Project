import StatusBadge from "../common/StatusBadge";
import Loader from "../common/Loader";
import AdminComplaintActions from "./AdminComplaintActions";

const AdminTable = ({
  complaints=[],
  loading=false,
  onUpdateStatus,
  onUpdatePriority,
  actionLoadingId=null,
}) => {
  if(loading){
    return <Loader text="Loading complaints..." />
  }
  if(!complaints || complaints.length === 0){
    return (
      <div className="w-full border border-gray-200 bg-white rounded-xl p-8 text-center text-gray-600">
        <p className="text-center text-gray-500">No complaints found.</p>
      </div>
    );
  }
  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-base font-semibold text-black">Active Complaints</h2>
        <p className="text-sm text-gray-500">
          Total: <span className="font-semibold">{complaints.length}</span>
        </p>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr className="text-left text-gray-700">
              <th className="px-5 py-3 font-semibold">Complaint ID</th>
              <th className="px-5 py-3 font-semibold">User</th>
              <th className="px-5 py-3 font-semibold">Status</th>
              <th className="px-5 py-3 font-semibold">Priority</th>
              <th className="px-5 py-3 font-semibold">Created</th>
              <th className="px-5 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((c,idx) => {
              const id = c.complaint_id || c._id || idx;
              const createdAt = c.createdAt || c.created_at || null;
              return (
                <tr
                  key={id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-5 py-4 font-semibold text-black whitespace-nowrap">
                    {c.complaint_id || "N/A"}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">
                        {c.name || "N/A"}
                      </span>
                      <span className="text-xs text-gray-600 break-all">
                        {c.email || "N/A"}
                      </span>
                      <span className="text-xs text-gray-600">
                        {c.phone || "N/A"}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={c.status || "pending"} />
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border bg-gray-50 text-gray-800 border-gray-200 capitalize">
                      {c.priority || "medium"}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-700 whitespace-nowrap">
                    {createdAt ? new Date(createdAt).toLocaleString() : "N/A"}
                  </td>
                  <td className="px-5 py-4 min-w-[260px]">
                    <AdminComplaintActions
                      complaintId={c.complaint_id}
                      currentStatus={c.status || "pending"}
                      currentPriority={c.priority || "medium"}
                      onUpdateStatus={onUpdateStatus}
                      onUpdatePriority={onUpdatePriority}
                      loading={actionLoadingId === c.complaint_id}
                    />
                    </td>
                </tr>
              )
            })}
          </tbody>
          </table>
          </div>
      </div>
  )
};

export default AdminTable;