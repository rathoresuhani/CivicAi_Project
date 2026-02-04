import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getComplaintById, deleteComplaint } from "../../services/adminService";

const AdminComplaintDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getComplaintById(id);
        setComplaint(data);
      } catch (err) {
        setError("Failed to load complaint details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this complaint?"))
      return;

    try {
      await deleteComplaint(id);
      alert("Complaint deleted successfully");
      navigate("/admin/dashboard");
    } catch (err) {
      alert("Failed to delete complaint");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Complaint Details</h2>

      <div className="border p-4 rounded-lg bg-white">
        <p><strong>ID:</strong> {complaint.complaint_id}</p>
        <p><strong>Name:</strong> {complaint.name}</p>
        <p><strong>Email:</strong> {complaint.email}</p>
        <p><strong>Phone:</strong> {complaint.phone}</p>
        <p><strong>Category:</strong> {complaint.category}</p>
        <p><strong>Description:</strong> {complaint.raw_description}</p>
        <p><strong>Status:</strong> {complaint.status}</p>
        <p><strong>Priority:</strong> {complaint.priority}</p>

        <button
          onClick={handleDelete}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
        >
          Delete Complaint
        </button>
      </div>
    </div>
  );
};

export default AdminComplaintDetails;
