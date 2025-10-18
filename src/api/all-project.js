
import axiosInstance from "../utils/api";

export const getAllProjects = async (page, limit) => {
  try {
    const response = await axiosInstance.get(`/submission/get-submissions?page=${page}&limit=${limit}`);
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
export const searchProjects = async (query, page = 1, limit = 10) => {
  try {
    const response = await axiosInstance.get("/submission/search-submissions", {
      params: {
        q: query,
        page,
        limit,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error searching projects:", error);
    throw error.response ? error.response.data : error;
  }
};


export const getAllStudentProjects = async (page, limit) => {
  try {
    const response = await axiosInstance.get(`/submission/get-submissions-student?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error.response ? error.response.data : error;
  }
};

export const searchStudentProjects = async (query, page = 1, limit = 10) => {
  try {
    const response = await axiosInstance.get(
      `/submission/search-student-submissions`,{
      params: {
        q: query,
        page,
        limit,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error searching projects:", error);
    throw error.response ? error.response.data : error;
  }
};