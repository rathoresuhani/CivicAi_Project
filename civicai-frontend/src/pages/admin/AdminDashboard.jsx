import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import AdminFilter from '../../components/admin/AdminFilter';
import AdminTable from '../../components/admin/AdminTable';

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

  const fetchComplaints = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      setComplaints([
        {complaint_id: "CIVIC-11111",
          name: "Aman Gupta",
          email: "aman@gmail.com",
          phone: "9998887776",
          status: "pending",
          priority: "high",
          created_at: new Date().toISOString(),
        },
        {
          complaint_id: "CIVIC-22222",
          name: "Neha Sharma",
          email: "neha@gmail.com",
          phone: "8887776665",
          status: "in_progress",
          priority: "medium",
          created_at: new Date().toISOString(),
        },
        ])
    },1200);
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
  setActionLoadingId(complaintId);

  setTimeout(() => {
    setComplaints((prev) =>
      prev
        .filter((c) =>
          c.complaint_id === complaintId && newStatus === "resolved"
            ? false
            : true
        )

        .map((c) =>
          c.complaint_id === complaintId
            ? { ...c, status: newStatus }
            : c
        )
    );

    setActionLoadingId(null);
  }, 800);
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