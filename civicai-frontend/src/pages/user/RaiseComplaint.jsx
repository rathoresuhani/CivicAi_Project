import { useState } from "react";
import ComplaintForm from "../../components/complaint/ComplaintForm";
import { createComplaint } from "../../services/complaintService";

const RaiseComplaint = () => {
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      setError("");
      setSuccessData(null);

      const payload = {
        name: data.name,
        phone: data.phone,
        email: data.email,
        category: data.category,
        raw_description: data.description || "",
        raw_image_url: data.image || "",
        latitude: data.latitude || null,
        longitude: data.longitude || null,
      };

      console.log("Submitting payload:", JSON.stringify(payload, null, 2));

      const response = await createComplaint(payload);

      setSuccessData({
        complaint_id: response.complaint_id,
        priority: response.priority?.priority || response.priority,
      });
    } catch (err) {
      setError(err.message || "Failed to submit complaint");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <ComplaintForm onSubmit={handleSubmit} loading={loading} />

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      {successData && (
        <div className="mt-6 p-4 border border-green-300 bg-green-50 rounded-lg">
          <h3 className="font-semibold text-green-800">
            Complaint Registered Successfully
          </h3>

          <p className="mt-2 text-sm">
            Complaint ID:
            <strong className="ml-2 font-mono font-semibold">
              {successData.complaint_id}
            </strong>
          </p>

          <p className="mt-1 text-sm">
            Priority:
            <strong className="ml-2 font-semibold">
              {typeof successData.priority === "object"
                ? successData.priority?.priority || "N/A"
                : successData.priority || "N/A"}
            </strong>
          </p>

          <p className="text-xs text-green-700 mt-1">
            Please save this ID for future tracking.
          </p>
        </div>
      )}
    </div>
  );
};

export default RaiseComplaint;
