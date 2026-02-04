import api from './api';

export const getAdminComplaints = async (filters = {}) => {
  try {
    const params = {};

    if (filters.status) params.status = filters.status;
    if (filters.priority) params.priority = filters.priority;
    if (filters.days) params.days = filters.days;

    const response = await api.get("/admin/complaints", { params,
      headers: {
      "x-admin-key": localStorage.getItem("ADMIN_KEY")
      },
     });
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to fetch admin complaints",
      }
    );
  }
};

export const updateComplaintStatus = async (complaintId, status) => {
  const response = await api.patch(
    `/complaints/${complaintId}/status`,
    { status },
    {
      headers: {
        "x-admin-key": localStorage.getItem("ADMIN_KEY"),
      },
    }
  );
  return response.data;
};

export const updateComplaintPriority = async (complaintId, priority) => {
  const response = await api.patch(
    `/complaints/${complaintId}/priority`,
    { priority },
    {
      headers: {
        "x-admin-key": localStorage.getItem("ADMIN_KEY"),
      },
    }
  );
  return response.data;
};

export const getComplaintById = async (id) => {
  try {
    const response = await api.get(`/complaints/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch complaint" };
  }
};

export const deleteComplaint = async (id) => {
  try {
    await api.delete(`/admin/complaints/${id}`, {
      headers: {
        "x-admin-key": localStorage.getItem("ADMIN_KEY"),
      },
    });
  } catch (error) {
    throw error.response?.data || { message: "Failed to delete complaint" };
  }
};
