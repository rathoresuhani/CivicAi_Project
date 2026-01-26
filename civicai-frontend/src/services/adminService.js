import api from '/api';

export default getAdminComplaints = async (filters = {}) => {
  try {
    const params = {};
    if(filters.status) params.status = filters.status;
    if(filters.priority) params.priority = filters.priority;
    if(filters.days) params.days = filters.days;

    const response = await api.get("/admin/complaints",{params});
    return response.data;
  }catch(error){
    throw (error.response?.data || {
      message: "Failed to fetch admin complaints",
    }
  );
  }
}

export const updateComplaintStatus = async (getComplaintById,status) => {
  try {
    const response = await api.patch(`/complaints/${complaintId}/status`,{status});
    return response.data;
  }catch(error){
    throw(
      error.response?.data || {
        message:"Failed to update complaint status",
      }
    );
  }
};

export const updateComplaintPriority = async (complaintId, priority) => {
  try{
    const response = await api.patch(`/complaints/${complaintId}/priority`,{priority});
    return response.data;
  }catch(error){
    throw(
      error.response?.data || {
        message: "Failed to update complaint priority",
      }
    );
  }
};
