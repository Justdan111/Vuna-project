import React from "react";
import { ChevronDown } from "lucide-react";

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

export default SelectField;