import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import AdminTable from "../../components/admin/AdminTable";
import {getAdminComplaints} from "../../services/adminService";

const ResolvedComplaints = () => {
  const navigate = useNavigate();
  const [complaints,setComplaints] = useState([]);
  const [loading,setLoading] = useState(false);

  useEffect (() => {
    const key = localStorage.getItem("ADMIN_KEY");
    if(!key) {
      navigate("/admin/login");
    }
  },[navigate]);

  const fetchResolvedComplaints = async () => {
    try{
      setLoading(true);
      const data = await getAdminComplaints();
      const resolved = data.filter(
        (c) => c.status === "resolved",
      );
      setComplaints(resolved);
    }catch(err){
      alert("Failed to fetch resolved complaints");
    }finally{
      setLoading (false);
    }
  }
  useEffect (() => {
    fetchResolvedComplaints();
  },[]);
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-black">
            Resolved Complaints
          </h1>
          <p className="mt-2 text-gray-600">
            View all complaints that have been resolved.
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/dashboard")}
          className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-semibold hover:bg-gray-100"
        >
          Back to Dashboard
        </button>
      </div>

      <AdminTable
        complaints={complaints}
        loading={loading}
        hideActions={true}
      />
    </div>
  );
}

export default ResolvedComplaints;