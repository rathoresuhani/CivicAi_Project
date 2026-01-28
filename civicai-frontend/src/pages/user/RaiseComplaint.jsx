import {useState} from 'react';
import ComplaintForm from '../../components/complaint/ComplaintForm';
import { createComplaint } from '../../services/complaintService';

const RaiseComplaint = () => {
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [error,setError] = useState("");

  const handleSubmit = async (data) => {
    try{
    console.log("Complaint Form data:", data);
    setLoading(true);
    setError("");
    setSuccessData(null);

    const response = await createComplaint(formData);
      setSuccessData({
        complaint_id: response.complaint_id,
        priority: response.priority,
      });
    }catch(err){
      setError(err.message || "Failed to submit complaint");
    }finally{
      setLoading(false);
    }
  };
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-black">Raise a Complaint</h1>
      <p className="mt-2 text-gray-600">
          Fill your basic details and submit your complaint. You’ll get a
          Complaint ID for tracking.
      </p>
      </div>

    {successData && (
        <div className="mb-6 border border-green-200 bg-green-50 rounded-xl p-5">
          <p className="text-sm font-semibold text-green-800">
            ✅ Complaint Registered Successfully
          </p>
          <p className="text-sm text-green-700 mt-2">
            Complaint ID:{" "}
            <span className="font-bold">{successData.complaint_id}</span>
          </p>
          <p className="text-sm text-green-700 mt-1">
            Priority:{" "}
            <span className="font-bold capitalize">{successData.priority}</span>
          </p>
          <p className="text-xs text-green-700 mt-2">
            Save your Complaint ID to track status later.
          </p>
        </div>
      )}
      <ComplaintForm onSubmit={handleSubmit} loading={loading} />
    </div>
  )
};

export default RaiseComplaint;