import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { submitProjectForm } from "../api/student-form";
import toast from "react-hot-toast";

const InputField = ({ label, value, onChange }) => {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="peer w-full h-[60px] px-6 text-[18px] text-gray-700 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-[#32936F] focus:shadow-lg focus:shadow-[#32936F]/20"
        placeholder=" "
      />
      <label className="absolute left-4 -top-3 px-2 text-sm font-medium text-[#32936F] bg-white rounded-md">
        {label}
      </label>
    </div>
  );
};

const SelectField = ({ label, value, onChange, options }) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="peer w-full h-[60px] px-6 pr-12 text-[18px] text-gray-700 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-[#32936F] focus:shadow-lg focus:shadow-[#32936F]/20 appearance-none cursor-pointer"
      >
        <option value="" disabled>Select {label}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      <label className="absolute left-4 -top-3 px-2 text-sm font-medium text-[#32936F] bg-white rounded-md">
        {label}
      </label>
    </div>
  );
};

const FormPurposePage = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    matnumber: "",
    supervisor: "",
    panelist: "",
    domain: "",
    topic: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const supervisors = [
    "HOD/Mr Enoch Daniel",
    "Dr Emmanuel/Mr Thomas ",
    "Dr Amaku/Mr Eric",
    "Mr Victor",
    "Mr Felix",
    "Mr Nuhu",
    "Mr Samuel",
    "Engr Calistus",
    "Mr Onoja",
  ];

  const domain = [
    "Artificial Intelligence (AI)/ Machine Learning",
    "Data Science and Big Data Analytics",
    "Cybersecurity",
    "Networking",
    "Internet of Things (IoT)",
    "Software Application Development",
    "Web 3.0 and Blockchain",
    "Hardware and Robotics",
    "Human–Computer Interaction (HCI)",
    "Game Development",
    "Quantum Computing",
    "Cloud Computing and Virtualization",
    "Bioinformatics and Computational Biology",
    "Emerging / Cross-Cutting Areas"
  ];

  const panelistGroups = ["Group A", "Group B", "Group C", "Group D", "Group E"];

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    setIsSubmitting(true);

    const response = await submitProjectForm(formData);

    // Check backend response for success or matric number error
    if (response?.error && response.error.includes("matric")) {
      toast.error("Matric number already exists. Please check and try again.");
    } else {
      toast.success("Project submitted successfully!");
      console.log("Server Response:", response);

      // Reset form after success
      setFormData({
        fullname: "",
        matnumber: "",
        supervisor: "",
        panelist: "",
        domain: "",
        topic: ""
      });

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  } catch (error) {
    console.error("Submission failed:", error);

    // If backend sent a message about matric number or general issue
    if (error?.response?.data?.error?.includes("matric")) {
      toast.error("Matric number already exists.");
    } else {
      toast.error("Something went wrong. Please try again.");
    }
  } finally {
    setIsSubmitting(false);
  }
};



  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="w-full max-w-[520px] p-8">
        <div className="w-full bg-white/40 backdrop-blur-lg border border-white/60 shadow-2xl rounded-3xl p-10 space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#32936F] mb-2">Project Registration</h2>
            <p className="text-[#32936F]">Submit your project details</p>
          </div>

          <InputField
            label="Full Name"
            value={formData.fullname}
            onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
          />

          <InputField
            label="Matriculation Number"
            value={formData.matnumber}
            onChange={(e) => setFormData({ ...formData, matnumber: e.target.value })}
          />

          <SelectField
            label="Project Supervisor"
            value={formData.supervisor}
            onChange={(e) => setFormData({ ...formData, supervisor: e.target.value })}
            options={supervisors}
          />

          <SelectField
            label="Panelist Section"
            value={formData.panelist}
            onChange={(e) => setFormData({ ...formData, panelist: e.target.value })}
            options={panelistGroups}
          />
          
          <SelectField
            label="Domain"
            value={formData.domain}
            onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
            options={domain}
          />

          <InputField
            label="Project Topic"
            value={formData.topic}
            onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
          />

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full h-[56px] text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 
              ${isSubmitting 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-gradient-to-r from-[#32936F] to-[#2a7a5c] text-white hover:scale-[1.02]"
              }`}
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
                    </button>

        </div>
      </div>
    </div>
  );
};

export default FormPurposePage;