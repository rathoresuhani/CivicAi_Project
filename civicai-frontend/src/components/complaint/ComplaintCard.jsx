import StatusBadge from '../common/StatusBadge';

const ComplaintCard = ({ complaint, onClick }) => {
  if (!complaint) return null;

  const complaintId =
    complaint.complaint_id || complaint.id || complaint._id || "N/A";

  const email = complaint.email || "N/A";

  const priority = complaint.priority || "medium";
  const status = complaint.status || "pending";

  const description =
    complaint.raw_description || "No description provided";

  const latitude = complaint.latitude;
  const longitude = complaint.longitude;

  const location =
    latitude && longitude
      ? `Lat: ${latitude}, Lng: ${longitude}`
      : "N/A";

  const createdAt = complaint.created_at
    ? new Date(complaint.created_at).toLocaleString()
    : "N/A";

  return (
    <div
      onClick={onClick}
      className="border rounded-lg p-4 bg-white hover:shadow cursor-pointer"
    >
      <p className="text-sm font-semibold text-gray-800">
        Complaint ID: {complaintId}
      </p>
      <StatusBadge status={status} />

      <p className="text-sm text-gray-600 mt-1">
        Email: {email}
      </p>

      <p className="text-sm text-gray-600 mt-1">
        Location: {location}
      </p>

      <p className="text-sm text-gray-700 mt-2">
        {description}
      </p>

      <div className="flex justify-between mt-3 text-xs">
        <span className="capitalize">Status: {status}</span>
        <span className="capitalize">Priority: {priority}</span>
      </div>

      <p className="text-xs text-gray-500 mt-2">
        Created at: {createdAt}
      </p>
    </div>
  );
};

export default ComplaintCard;
