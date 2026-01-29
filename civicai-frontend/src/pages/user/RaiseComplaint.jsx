import { useState } from "react";
import ComplaintForm from "../../components/complaint/ComplaintForm";
import { createComplaint } from "../../services/complaintService";

const RaiseComplaint = () => {
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (data) => {
    try {
      console.log("Complaint Form data:", data);

      setLoading(true);
      setError("");
      setSuccessData(null);

      const response = await createComplaint({
        name: data.name,
        email: data.email,
        phone: data.phone,
        // image will be added later
      });

      setSuccessData({
        complaint_id: response.complaint_id,
        priority: response.priority,
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

      {error && (
        <p className="mt-4 text-sm text-red-600">
          {error}
        </p>
      )}

      {successData && (
        <div className="mt-6 p-4 border border-green-300 bg-green-50 rounded-lg">
          <h3 className="font-semibold text-green-800">
            Complaint Registered Successfully
          </h3>
          <p className="mt-2 text-sm">
            Complaint ID:
            <span className="ml-2 font-mono font-semibold">
              {successData.complaint_id}
            </span>
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
