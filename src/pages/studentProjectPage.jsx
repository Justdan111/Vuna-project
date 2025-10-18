import React, { useState, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import StudentTable from "../components/studentTable";
import { getAllStudentProjects, searchStudentProjects } from "../api/all-project";
import { useLoader } from "../context/LoaderContext";
import toast from "react-hot-toast";

const StudentProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const { showLoader, hideLoader } = useLoader();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("domain");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    showLoader();
    setError("");

    try {
      let data;
      
      if (searchQuery.trim()) {
        data = await searchStudentProjects(searchQuery, currentPage, limit);

        // If backend returns an error field, show it as a toast and clear results
        if (data?.error) {
          toast.error(data.error);
          setProjects([]);
          return;
        }
      } else {
        data = await getAllStudentProjects( currentPage, limit);
      }

    if (data) {
      // ✅ Set projects list
      setProjects(data.data || []);

      // ✅ Update pagination info
      if (data.pagination) {
        setTotalPages(data.pagination.totalPages);
        setTotalRecords(data.pagination.total);
        setLimit(data.pagination.limit);
      } else {
        // fallback if pagination missing
        setTotalPages(1);
        setTotalRecords(data.data?.length || 0);
      }

      console.log("✅ Projects fetched:", data.data);
      console.log("📄 Pagination info:", data.pagination);
    } else {
      // Handle case where data is null or malformed
      setProjects([]);
      setTotalPages(1);
      setTotalRecords(0);
    }
  } catch (err) {
    console.error("❌ Fetch error:", err);
    setError("Failed to load projects. Please try again.");
    setProjects([]);
    setTotalPages(1);
    setTotalRecords(0);
  } finally {
    hideLoader();
  }
};

useEffect(() => {
  const debounceTimer = setTimeout(() => {
    handleSearch();
  }, 1000);

  return () => clearTimeout(debounceTimer);
}, [currentPage, searchQuery, sortBy]);
  

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setCurrentPage(1); // Reset to first page when changing limit
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-8 px-4 sm:px-6 md:px-8 pb-10">
      {/* Header */}
      <div className="mb-6 text-center md:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1E523E] mb-2">
          All Student Projects
        </h1>
      </div>

      {/* Search Input */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by matriculation number"
            className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-[#32936F] focus:shadow-lg focus:shadow-[#32936F]/10"
          />
        </div>
      </div>

      {/* Projects Table (scrollable on mobile) */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-200">
        <div className="min-w-[700px]">
          <StudentTable projects={projects} />
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 w-full">
        <div className="flex items-center gap-3 text-gray-700 text-sm sm:text-base">
          <span className="font-medium">Page</span>
          <div className="bg-white border-2 border-gray-200 rounded-lg px-4 py-2 min-w-[60px] text-center font-semibold">
            {currentPage}
          </div>
          <span className="font-medium">of {totalPages}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-white border-2 border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50 hover:border-[#32936F] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            <ChevronLeft className="w-4 h-4" />
            Prev
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-[#32936F] to-[#2a7a5c] text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentProjectsPage;
