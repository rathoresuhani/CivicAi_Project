import api from './api';

export const createComplaint = async (data) => {
  try{
    const response = await api.post("/complaints", data);
    return response.data;
  }catch (error) {
    throw error.response?.data || { message: "Failed to create complaint" };
}
};

export const getComplaintById = async (complaintId) => {
  try{
    const response = await api.get(`/complaints/${complaintId}`);
    return response.data;
  }catch(error){
    throw error.response?.data || {message: "Complaint not found"};
  }
};

export const getComplaintsByEmail = async (email) => {
  try {
    const response = await api.get(`/complaints/email/${email}`);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to fetch complaints",
      }
    );
  }
};