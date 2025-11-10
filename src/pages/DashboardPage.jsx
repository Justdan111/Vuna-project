import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DocumentIcon from "../components/icons/DocumentIcon";
import GlobeIcon from "../components/icons/GlobeIcon";
import { getDashboardStats } from "../api/dashboard";
import { useLoader } from "../context/LoaderContext";
import { Folder } from 'lucide-react';

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalSubmissions: 0,
    totalApprovedProjects: 0,
    totalSupervisors: 0,
  });
  const { showLoader, hideLoader } = useLoader();
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      showLoader()
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (err) {
        setError(err);
      } finally {
        hideLoader();
      }
    };

    fetchData();
  }, []);

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-[24px]">
        {error}
      </div>
    );

  return (
    <>
    <section className="flex justify-center items-center w-full min-h-screen p-8 bg-gray-50">
      <div className="w-full max-w-6xl">
        {/* Action Card Section */}
        <div className="mb-12">
          <Link
            to={"/dashboard/projects"}
            className="block w-full text-left bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group"
          >
            {/* Card Header */}
            <div className="bg-gradient-to-r from-[#1E523E] to-[#2d7a5a] px-8 py-5 border-b border-gray-200 flex items-center gap-3">
              <Folder className="w-7 h-7 text-white" />
              <h3 className="text-2xl font-semibold text-white">
                All Projects
              </h3>
            </div>
            
            {/* Card Body */}
            <div className="p-8">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-base text-gray-500 mb-3">All Projects</p>
                  <p className="text-6xl font-bold text-[#1E523E]">
                    {stats.totalSubmissions + stats.totalApprovedProjects}
                  </p>
                </div>
                
                <div className="bg-teal-300 rounded-lg w-16 h-16 flex items-center justify-center shadow-sm">
                  <Folder className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Statistics Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Statistics Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Submissions */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-2">Total Submissions</p>
                  <p className="text-3xl font-bold text-[#1E523E]">{stats.totalSubmissions}</p>
                </div>
                <div className="bg-teal-300 rounded-lg w-12 h-12 flex items-center justify-center shadow-sm">
                  <DocumentIcon />
                </div>
              </div>
            </div>

            {/* Approved Projects */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-2">Approved Projects</p>
                  <p className="text-3xl font-bold text-[#1E523E]">{stats.totalApprovedProjects}</p>
                </div>
                <div className="bg-teal-300 rounded-lg w-12 h-12 flex items-center justify-center shadow-sm">
                  <DocumentIcon />
                </div>
              </div>
            </div>

            {/* Total Supervisors */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-2">Available Supervisors</p>
                  <p className="text-3xl font-bold text-[#1E523E]">{stats.totalSupervisors}</p>
                </div>
                <div className="bg-teal-300 rounded-lg w-12 h-12 flex items-center justify-center shadow-sm">
                  <GlobeIcon />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
    </>
  );
};

export default DashboardPage;
