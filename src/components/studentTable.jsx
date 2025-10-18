
const StudentTable = ({ projects }) => {
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
               
               
                  {project.topic}
              </td>
              <td className="px-6 py-4 text-gray-700 text-sm">{project.supervisor}</td>
              <td className="px-6 py-4 text-gray-700 text-sm font-mono">{project.matnumber}</td>
              <td className="px-6 py-4">
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
              </td>
              <td className="px-6 py-4 text-gray-700 text-sm">{project.remark || "—"}</td>
              <td className="px-6 py-4 text-gray-600 text-sm"> {new Date(project.updatedAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;