import React, { useState, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import ProjectTable from "../components/ProjectTable";
import { getAllProjects, searchProjects } from "../api/all-project";
import { useLoader } from "../context/LoaderContext";

const AllProjectsPage = () => {
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
        data = await searchProjects(searchQuery, currentPage, limit);
      } else {
        data = await getAllProjects(currentPage, limit);
      }

      if (data) {
        const sorted = [...(data.data || [])].sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        setProjects(sorted);

        if (data.pagination) {
          setTotalPages(data.pagination.totalPages);
          setTotalRecords(data.pagination.total);
          setLimit(data.pagination.limit);
        } else {
          setTotalPages(1);
          setTotalRecords(data.data?.length || 0);
        }

        console.log("✅ Projects fetched:", data.data);
        console.log("📄 Pagination info:", data.pagination);
      } else {
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

  // ✅ Debounce search + run on page change
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [currentPage, searchQuery, sortBy]);

  // ✅ Only reset page on search text change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setCurrentPage(1);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-[80px] sm:pt-[100px] lg:pt-[120px] px-4 sm:px-6 lg:px-8 pb-10">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1E523E] mb-2">
          All Student Projects
        </h1>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4 mb-6">
        <div className="relative flex-1 w-full sm:max-w-md">
          <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                setCurrentPage(1);
                handleSearch();
              }
            }}
            placeholder="Search by matric or supervisor"
            className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-[#32936F] focus:shadow-lg focus:shadow-[#32936F]/10"
          />
        </div>
      </div>

      {error ? (
        <div className="text-center text-red-600 py-10 text-sm sm:text-base">{error}</div>
      ) : (
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="min-w-full inline-block align-middle px-4 sm:px-0">
            <ProjectTable projects={projects} />
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 sm:mt-8">
        <div className="flex items-center gap-2 sm:gap-3 text-gray-700 text-sm sm:text-base">
          <span className="font-medium">Page</span>
          <div className="bg-white border-2 border-gray-200 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 min-w-[50px] sm:min-w-[60px] text-center font-semibold">
            {currentPage}
          </div>
          <span className="font-medium">of {totalPages}</span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base bg-white border-2 border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50 hover:border-[#32936F] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden xs:inline">Prev</span>
          </button>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base bg-gradient-to-r from-[#32936F] to-[#2a7a5c] text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            <span className="hidden xs:inline">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};


export default AllProjectsPage;

