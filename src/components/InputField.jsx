import React from "react";

const InputField = ({ label, value, onChange, type = "text" }) => {
  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder=" "
        className="peer w-full h-[60px] px-6 text-[18px] text-gray-700 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl outline-none transition-all duration-300 focus:border-[#32936F] focus:shadow-lg focus:shadow-[#32936F]/20 placeholder-transparent"
      />
      <label className="absolute left-4 -top-3 px-2 text-sm font-medium text-gray-600 bg-white rounded-md transition-all duration-300 peer-placeholder-shown:text-[18px] peer-placeholder-shown:top-[18px] peer-placeholder-shown:bg-transparent peer-focus:-top-3 peer-focus:text-sm peer-focus:text-[#32936F] peer-focus:bg-white">
        {label}
      </label>
    </div>
  );
};

export default InputField;