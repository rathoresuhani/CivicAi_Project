import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import AdminFilter from '../../components/admin/AdminFilter';
import AdminTable from '../../components/admin/AdminTable';

import {
  getAdminComplaints,
  updateComplaintStatus,
  updateComplaintPriority,
} from "../../services/adminService";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [filters,setFilters] = useState({
    status: "",
    priority: "",
    days:"",
  });
  const [complaints,setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  useEffect(() => {
    const key = localStorage.getItem("ADMIN KEY");
    if(!key){
      navigate('/admin/login');
    }
  },[navigate]);

  const fetchComplaints = async () => {
    try{
      setLoading(true);
      setError("");

      const data = await getAdminComplaints(filters);
      setComplaints(data.compplaints);
    }catch(err){
      setError(err.message || "Failed to fetch complaints");
    }finally{
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchComplaints();
  },[]);

  const handleApplyFilters = () => {
    fetchComplaints();
  };
  const handleResetFilters = () => {
    setFilters({status:"",priority:"",days:""});
    fetchComplaints();
  };

  const handleUpdateStatus = (complaintId, newStatus) => {
    try{
      setActionLoadingId(complaintId);
      await updateComplaintStatus(complaintId,newStatus);
    if (newStatus === "resolved") {
        setComplaints((prev) =>
          prev.filter((c) => c.complaint_id !== complaintId)
        );
      } else {
        setComplaints((prev) =>
          prev.map((c) =>
            c.complaint_id === complaintId
              ? { ...c, status: newStatus }
              : c
          )
        );
      }
    } catch (err) {
      alert(err.message || "Failed to update status");
    } finally {
      setActionLoadingId(null);
    }
  };

  export const handleUpdatePriority = async (complaintId, newPriority) => {
    try{
      setActionLoadingId(complaintId);
      await updateComplaintPriority(complaintId,newPriority);
    setComplaints((prev) =>
        prev.map((c) =>
          c.complaint_id === complaintId
            ? { ...c, priority: newPriority }
            : c
        )
      );
    } catch (err) {
      alert(err.message || "Failed to update priority");
    } finally {
      setActionLoadingId(null);
    }
  };
return (
  <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-black">
          Admin Dashboard
        </h1>
        <p className="mt-2 text-gray-600">
          Manage and resolve active civic complaints.
        </p>
      </div>
      <div className="mb-8">
        <AdminFilter
          filters={filters}
          setFilters={setFilters}
          onApply={handleApplyFilters}
          onReset={handleResetFilters}
        />
      </div>

      <AdminTable
        complaints={complaints}
        loading={loading}
        onUpdateStatus={handleUpdateStatus}
        onUpdatePriority={handleUpdatePriority}
        actionLoadingId={actionLoadingId}
      />
      </div>
)
};

export default AdminDashboard;