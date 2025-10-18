import axios from "axios";

const BASE_URL ="https://vunacsc-backend.onrender.com/api/v1"

// Fetch dashboard stats
export const getDashboardStats = async () => {
  const token = localStorage.getItem("token"); 
  try {
    const response = await axios.get(`${BASE_URL}/submission/submission-stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data; 
  } catch (error) {
    throw error.response?.data?.message || "Failed to load dashboard data";
  }
};
