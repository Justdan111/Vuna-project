import axios from "axios";


const BASE_URL ="https://vunacsc-backend.onrender.com/api/v1"

// Login function
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });
    
    const token = response.data?.token;
    if (token) {
      localStorage.setItem("authToken", token);
    }

    return response.data;
  } catch (error) {
   
    throw error.response?.data?.message || "Login failed";
  }
};
