import { useState } from "react";
import ComplaintCard from "../../components/complaint/ComplaintCard";
import Loader from "../../components/common/Loader";
import { getComplaintById } from "../../services/complaintService";


const TrackComplaint = () => {
  const [complaintId, setComplaintId] = useState("");
  const [loading, setLoading] = useState(false);
  const [complaint, setComplaint] = useState(null);
  const [error, setError] = useState("");

  const handleTrack = async (e) => {
    e.preventDefault();

    if(!complaintId.trim()){
      setError("Please enter Complaint Id");
      return;
    }
    try{
    setError("");
    setComplaint(null);
    setLoading(true);
    const data = await getComplaintById(complaintId.trim());
    setComplaint(data);
    }catch(err){
      setError(err.message || err.detail || "Failed to fetch complaint");
    }finally{
      setLoading(false);
    }
    
  };
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-black">
          Track Complaint by ID
        </h1>
        <p className="mt-2 text-gray-600">
          Enter your Complaint ID to view current status and details.
        </p>
      </div>
      <div className="w-full bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={complaintId}
            onChange={(e) => setComplaintId(e.target.value)}
            placeholder="Enter Complaint ID (e.g. CIVIC-12345)"
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              loading
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-900"
            }`}
          >
            {loading ? "Tracking..." : "Track"}
          </button>
        </form>
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </div>
      <div className="mt-8">
        {loading && <Loader text="Fetching complaint details..." />}

        {complaint && (
          <ComplaintCard
            complaint={complaint}
            onClick={() => {}}
          />
        )}
      </div>
    </div>
  )
};

export default TrackComplaint;