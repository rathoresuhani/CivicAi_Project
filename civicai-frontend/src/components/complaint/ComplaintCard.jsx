import StatusBadge from '../common/StatusBadge';

const ComplaintCard = ({complaint,onClick}) => {
  if(!complaint) return null;

  const ComplaintId = complaint.complaint_id || complaint.id || complaint._id || "N/A";

  const name = complaint.name || 'N/A';
  const email = complaint.email || 'N/A';
  const phone = complaint.phone || 'N/A';

  const priority = complaint.priority || 'medium';
  const status = complaint.status || 'pending';

  const location = complaint.location || 'N/A';
  const category = complaint.category || 'N/A';
  const description = complaint.description || 'N/A';

  const createdAt = complaint.created_at || complaint.createdAt || complaint.timeStamp || 'N/A';

  return (
    <div onClick={()=> onClick && onClick(complaint)}  className={`w-full border border-gray-200 bg-white rounded-xl p-5 shadow-sm transition ${
        onClick ? "cursor-pointer hover:shadow-md" : ""
    }`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-gray-500">Complaint ID</p>
          <h3 className="text-base font-semibold text-black">{complaintId}</h3>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={status} />
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border bg-gray-50 text-gray-800 border-gray-200">
            Priority:{" "}
            <span className="ml-1 capitalize font-bold">{priority}</span>
          </span>
        </div>
        </div>
        <div className="my-4 border-t border-gray-100"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500 text-xs">Name</p>
          <p className="text-gray-800 font-medium">{name}</p>
        </div>

        <div>
          <p className="text-gray-500 text-xs">Email</p>
          <p className="text-gray-800 font-medium break-all">{email}</p>
        </div>

        <div>
          <p className="text-gray-500 text-xs">Phone</p>
          <p className="text-gray-800 font-medium">{phone}</p>
        </div>

        <div>
          <p className="text-gray-500 text-xs">Created At</p>
          <p className="text-gray-800 font-medium">
            {createdAt ? new Date(createdAt).toLocaleString() : "Not available"}
          </p>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500 text-xs">Category</p>
          <p className="text-gray-800 font-medium capitalize">{category}</p>
        </div>

        <div>
          <p className="text-gray-500 text-xs">Location</p>
          <p className="text-gray-800 font-medium">{location}</p>
        </div>

        <div className="md:col-span-2">
          <p className="text-gray-500 text-xs">Description</p>
          <p className="text-gray-800 font-medium">{description}</p>
        </div>
      </div>
    </div>
  )
};

export default ComplaintCard;