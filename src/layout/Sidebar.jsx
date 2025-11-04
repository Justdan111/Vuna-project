import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/veritas.png";
import DashboardIcon from "../components/icons/DashboardIcon";
import LogoutIcon from "../components/icons/LogoutIcon";
import { Menu, X } from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 🔒 Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); 
  };

  // Close mobile menu when clicking a link
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#1E523E] text-white p-3 rounded-lg shadow-lg"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static
          w-[280px] lg:w-[20%]
          bg-[#1E523E] 
          h-screen 
          z-40
          transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="w-full h-[100px] bg-white flex justify-center items-center">
          <img src={logo} alt="Veritas logo" className="max-w-[80%] h-auto" />
        </div>

        <ul className="mt-6 flex flex-col gap-5 px-3">
          {/* Dashboard Link */}
          <li>
            <NavLink
              to={"/dashboard"}
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `flex gap-4 rounded-[15px] px-3 py-2 items-center w-full ${
                  isActive ? "bg-white text-[#1E523E]" : "text-white hover:bg-white/20"
                }`
              }
            >
              <span className="p-2 rounded-[12px]">
                <DashboardIcon />
              </span>
              <span>Dashboard</span>
            </NavLink>
          </li>

          {/* Logout Button */}
          <li>
            <button
              onClick={() => {
                handleLogout();
                closeMobileMenu();
              }}
              className="flex gap-4 bg-white rounded-[15px] px-3 py-2 items-center w-full text-[#1E523E] hover:bg-gray-100 transition-all"
            >
              <span className="p-2 rounded-[12px]">
                <LogoutIcon />
              </span>
              <span>Log out</span>
            </button>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;