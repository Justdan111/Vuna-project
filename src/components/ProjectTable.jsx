import React from "react";
import { Link } from "react-router-dom";

const ProjectTable = ({ projects }) => {
  return (
    <div className="w-full mt-8 overflow-hidden rounded-xl shadow-lg border border-gray-200">
      <table className="w-full bg-white">
        <thead className="bg-gradient-to-r from-[#32936F] to-[#2a7a5c] text-white">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold">Project Name</th>
            <th className="px-6 py-4 text-left text-sm font-semibold">Supervisor Name</th>
            <th className="px-6 py-4 text-left text-sm font-semibold">Student Matriculation Number</th>
            <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
            <th className="px-6 py-4 text-left text-sm font-semibold">Remark</th>
            <th className="px-6 py-4 text-left text-sm font-semibold">Last Updated</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {projects.map((project, index) => (
            <tr 
              key={index} 
              className="hover:bg-gray-50 transition-colors duration-150"
            >
              <td className="px-6 py-4">
                <Link 
                  to={`/dashboard/projectDetail/${project._id}`}
                  className="text-[#32936F] hover:text-[#2a7a5c] font-medium hover:underline transition-colors"
                >
                  {project.topic}
                </Link>
              </td>
              <td className="px-6 py-4 text-gray-700 text-sm">{project.supervisor}</td>
              <td className="px-6 py-4 text-gray-700 text-sm font-mono">{project.matnumber}</td>
              <td className="px-6 py-4">
                <span
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold ${
                    project.status === 'Approved'
                      ? 'bg-teal-100 text-teal-800 border border-teal-200'
                      : project.status === 'Under Review'
                      ? 'bg-cyan-100 text-cyan-800 border border-cyan-200'
                      : project.status === 'Pending'
                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                      : project.status === 'Rejected'
                      ? 'bg-rose-200 text-rose-900 border border-rose-300'
                      : project.status === 'Draft'
                      ? 'bg-stone-100 text-stone-800 border border-stone-200'
                      : 'bg-violet-100 text-violet-800 border border-violet-200'
                  }`}
                >
                  {project.status}
                </span>

              </td>
              <td className="px-6 py-4 text-gray-700 text-sm">{project.remark || "—"}</td>
              <td className="px-6 py-4 text-gray-600 text-sm">
                {new Date(project.updatedAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;