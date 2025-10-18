import React, { useState, useEffect } from "react";
import { ArrowLeft, Edit2, Save, X, Send } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import SelectField from "../components/selectField";
import { getProjectById, updateProjectRemark } from "../api/all-project";
import { useLoader } from "../context/LoaderContext";

const ProjectDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isEditing, setIsEditing] = useState(null);
 const [refetch, setRefetch] = useState(() => () => {});
  const [isEditingRemark, setIsEditingRemark] = useState(false);
  const [tempRemark, setTempRemark] = useState("");
  const [project, setProjects] = useState([]);
  const { showLoader, hideLoader } = useLoader();
  const [error, setError] = useState("");

    useEffect(() => {
      const fetchProjects = async () => {
        showLoader();
        setError("");
  
  
        try {
          const data = await getProjectById(id);
  
          
          if (data?.data) {
            setProjects(data.data);
          } else {
            setProjects([]);
          }
  
          console.log("Projects fetched:", data.data);
        } catch (err) {
          console.error("Fetch error:", err);
          setError("Failed to load projects. Please try again.");
        } finally {
          hideLoader();
        }
      };
    
      setRefetch(() => fetchProjects);

      
  
      fetchProjects();
    }, []);
  
  

  const panelistGroups = ["Group A", "Group B", "Group C", "Group D", "Group E"];
  const statusOptions = [
    "Draft",
    "Under Review",
    "Approved",
    "Rejected",
  ];

  const handleEdit = (field) => {
    setIsEditing(field);
  };

    const handleSave = async (field) => {
  setIsEditing(null);
  showLoader();

  try {
    const payload = { [field]: project[field] }; 
    await updateProjectRemark(id, payload);

    console.log("Saved:", payload);

    // ✅ Re-fetch updated data
    await refetch();
  } catch (error) {
    console.error("Error updating project:", error);
    alert("Failed to update project. Please try again.");
  } finally {
    hideLoader();
  }
};


  const handleCancel = () => {
    setIsEditing(null);
  };

  const handleEditRemark = () => {
    setTempRemark(project.remark);
    setIsEditingRemark(true);
  };

    const handleSendRemark = async () => {
      showLoader();
      try {
        const payload = { remark: tempRemark }; // only remark
        await updateProjectRemark(id, payload);
        setProjects({ ...project, remark: tempRemark });
        setIsEditingRemark(false);
      } catch (error) {
        console.error("Error sending remark:", error);
        alert("Failed to update remark.");
      } finally {
        hideLoader();
      }
    };


  const handleCancelRemark = () => {
    setTempRemark("");
    setIsEditingRemark(false);
  };

const DetailRow = ({ label, field, value, type = "text", editable = true }) => {
    const isEditingThis = isEditing === field;

    return (
      <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 hover:shadow-md transition-all duration-300">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4">
          <div className="flex-1 w-full">
            <label className="text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2 block">{label}</label>
            {isEditingThis ? (
              type === "select" ? (
                <SelectField
                  label=""
                  value={project[field]}
                  onChange={(e) => setProjects({ ...project, [field]: e.target.value })}
                  options={field === "panelistSection" ? panelistGroups : statusOptions}
                />
              ) : (
                <input
                  type="text"
                  value={project[field]}
                  onChange={(e) => setProjects({ ...project, [field]: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-700 bg-gray-50 border-2 border-[#32936F] rounded-lg outline-none"
                  autoFocus
                />
              )
            ) : (
              <p className="text-gray-800 font-medium text-base sm:text-lg break-words">{value}</p>
            )}
          </div>
          
          {editable && (
            <div className="flex gap-2 self-end sm:self-start">
              {isEditingThis ? (
                <>
                  <button
                    onClick={() => handleSave(field)}
                    className="p-2 sm:p-2.5 bg-[#32936F] text-white rounded-lg hover:bg-[#2a7a5c] transition-all duration-300 hover:scale-105"
                    title="Save"
                  >
                    <Save className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleCancel}
                    className="p-2 sm:p-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-300"
                    title="Cancel"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleEdit(field)}
                  className="p-2 sm:p-2.5 border-2 border-[#F57E77] text-[#F57E77] rounded-lg hover:bg-[#F57E77] hover:text-white transition-all duration-300 hover:scale-105"
                  title="Edit"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-[80px] sm:pt-[100px] lg:pt-[120px] px-4 sm:px-6 lg:px-8 pb-10">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-700 hover:text-[#32936F] font-medium mb-3 sm:mb-4 transition-colors text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden xs:inline">Back to All Projects</span>
          <span className="xs:hidden">Back</span>
        </button>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-1 sm:mb-2">Project Details</h1>
        <p className="text-sm sm:text-base text-gray-600">View and manage project information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {/* Left Column - Project Details */}
        <div className="lg:col-span-2 space-y-3 sm:space-y-4">
          <DetailRow
            label="Project Name"
            field="topic"
            value={project.topic}
            editable={true}
          />
          
          <DetailRow
            label="Student Name"
            field="fullname"
            value={project.fullname}
            editable={false}
          />
          
          <DetailRow
            label="Matriculation Number"
            field="matnumber"
            value={project.matnumber}
            editable={false}
          />
          
          <DetailRow
            label="Project Supervisor"
            field="supervisor"
            value={project.supervisor}
            type="select"
            editable={false}
          />
          
          <DetailRow
            label="Panelist Section"
            field="panelist"
            value={project.panelist}
            type="select"
            editable={true}
          />
          
          <DetailRow
            label="Status"
            field="status"
            value={project.status}
            type="select"
            editable={true}
          />
          
          <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 hover:shadow-md transition-all duration-300">
            <div className="flex justify-between items-start gap-4 mb-2">
              <label className="text-xs sm:text-sm font-medium text-gray-600">Remark</label>
            </div>
            <p className="text-gray-800 font-medium text-base sm:text-lg break-words mb-4">{project.remark || "-"}</p>
          </div>
          
          <DetailRow
            label="Last Updated"
            field="lastUpdated"
            value={new Date(project.updatedAt).toLocaleDateString()} 
            editable={false}
          />
        </div>

        {/* Right Column - Actions */}
        <div className="lg:col-span-1 space-y-3 sm:space-y-4">
          {/* Status Card */}
          <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 shadow-lg">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Project Status</h3>
            <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 xs:gap-0 mb-4 sm:mb-6">
              <span className="text-sm sm:text-base text-gray-600">Current Status:</span>
                <span
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold ${
                    project.status === 'Approved'
                      ? 'bg-green-200 text-green-800 border border-green-400'
                      : project.status === 'Under Review'
                      ? 'bg-indigo-200 text-indigo-800 border border-indigo-400'
                      : project.status === 'Pending'
                      ? 'bg-orange-200 text-orange-800 border border-orange-400'
                      : project.status === 'Rejected'
                      ? 'bg-red-200 text-red-800 border border-red-400'
                      : project.status === 'Draft'
                      ? 'bg-gray-200 text-gray-800 border border-gray-400'
                      : 'bg-fuchsia-200 text-fuchsia-800 border border-fuchsia-400'
                  }`}
                >
                  {project.status}
                </span>

            </div>
            <div className="text-xs sm:text-sm text-gray-600 space-y-2">
              <p><strong>Updated:</strong> {new Date(project.updatedAt).toLocaleDateString()}</p>
              <p><strong>Remark:</strong> {project.remark || "—"}</p>
            </div>
          </div>

          {/* Remark Actions */}
          <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 shadow-lg">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Add Remark</h3>
            <div className="space-y-3 sm:space-y-4">
              {!isEditingRemark ? (
                <button
                  onClick={handleEditRemark}
                  className="w-full px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-[#32936F] to-[#2a7a5c] text-white rounded-lg sm:rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Edit Remark
                </button>
              ) : (
                <>
                  <textarea
                    value={tempRemark}
                    onChange={(e) => setTempRemark(e.target.value)}
                    placeholder="Enter your remark here..."
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-lg outline-none focus:border-[#32936F] transition-all duration-300 resize-none"
                    rows="4"
                    autoFocus
                  />
                  <div className="flex gap-2 sm:gap-3">
                    <button
                      onClick={handleSendRemark}
                      className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-[#32936F] to-[#2a7a5c] text-white rounded-lg sm:rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span className="hidden xs:inline">Send</span>
                    </button>
                    <button
                      onClick={handleCancelRemark}
                      className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-200 text-gray-700 rounded-lg sm:rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300"
                    >
                      <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span className="hidden xs:inline">Cancel</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;