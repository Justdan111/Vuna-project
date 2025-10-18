
import axios from "axios";

const BASE_URL ="https://vunacsc-backend.onrender.com/api/v1"

export const submitProjectForm = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/submission/create-submission`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("jajajajajajjaja", response)
    console.log("jajajajajajjaja2", response.data)
    return response.data;
  } catch (error) {
    console.error("Error submitting form:", error);
    throw error.response ? error.response.data : error;
  }
};

