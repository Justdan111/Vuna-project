
import axiosInstance from "../utils/api";

export const getAllProjects = async () => {
  try {
    const response = await axiosInstance.get(`/submission/get-submissions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error.response ? error.response.data : error;
  }
};

// Fetch single project
export const getProjectById = async (id) => {
  try {
    const response = await axiosInstance.get(`/submission/one-submission/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching project:", error);
    throw error.response ? error.response.data : error;
  }
};

// Update project remark
export const updateProjectRemark = async (id, payload) => {
  try {
    const response = await axiosInstance.patch(
      `/submission/update-submission/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error updating project:", error);
    throw error.response ? error.response.data : error;
  }
};



// search by matnumber ot supervisor
export const searchProjects = async (query) => {
  try {
    const response = await axiosInstance.get(
      `/submission/search-submissions?q=${encodeURIComponent(query)}`
    );
    return response.data;
  } catch (error) {
    console.error("Error searching projects:", error);
    throw error.response ? error.response.data : error;
  }
};

export const getAllStudentProjects = async () => {
  try {
    const response = await axiosInstance.get(`/submission/get-submissions-student`);
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error.response ? error.response.data : error;
  }
};

export const searchStudentProjects = async (query) => {
  try {
    const response = await axiosInstance.get(
      `/submission/search-student-submissions?q=${encodeURIComponent(query)}`
    );
    return response.data;
  } catch (error) {
    console.error("Error searching projects:", error);
    throw error.response ? error.response.data : error;
  }
};