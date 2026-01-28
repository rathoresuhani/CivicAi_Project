import { useState } from "react";
import ComplaintList from "../../components/complaint/ComplaintList";
import Loader from "../../components/common/Loader";
import { getComplaintsByEmail } from "../../services/complaintService";

const MyComplaints = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState("");

  const handleFetch = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Please enter an email");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    try {
      setError("");
      setLoading(true);

      const data = await getComplaintsByEmail(email.trim());
      setComplaints(data.complaints || []);
    } catch (err) {
      setError(err.message || "Failed to fetch complaints");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-black">
          My Complaints (By Email)
        </h1>
        <p className="mt-2 text-gray-600">
          Enter your email to fetch all complaints registered with it.
        </p>
      </div>

      <div className="w-full bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <form
          onSubmit={handleFetch}
          className="flex flex-col sm:flex-row gap-3"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email (e.g. suhani@gmail.com)"
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
            {loading ? "Fetching..." : "Fetch Complaints"}
          </button>
        </form>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </div>

      <div className="mt-10">
        {loading && <Loader text="Fetching your complaints..." />}

        {!loading && (
          <ComplaintList
            title="Your Complaints"
            complaints={complaints}
            emptyText="No complaints found for this email."
          />
        )}
      </div>
    </div>
  );
};

export default MyComplaints;
