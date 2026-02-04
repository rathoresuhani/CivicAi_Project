import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Home';

import MyComplaints from '../pages/user/MyComplaints';
import RaiseComplaint from '../pages/user/RaiseComplaint';
import TrackComplaint from '../pages/user/TrackComplaint';

import AdminLogin from '../pages/admin/AdminLogin';
import AdminDashboard from '../pages/admin/AdminDashboard';
import ResolvedComplaints from '../pages/admin/resolvedComplaints';
import AdminComplaintDetails from "../pages/admin/AdminComplaintDetails";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="/user/raise" element={<RaiseComplaint />} />
      <Route path="/user/track" element={<TrackComplaint />} />
      <Route path="/user/my-complaints" element={<MyComplaints />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/admin/resolved" element={<ResolvedComplaints />} />
      <Route path="/admin/complaints/:id" element={<AdminComplaintDetails />} />
    </Routes>
  );
}

export default AppRoutes;