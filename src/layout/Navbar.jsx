import React from "react";
import MenuButton from "../components/icons/MenuButton";
import { useLocation, useParams } from "react-router-dom";
import { getNavTitle } from "../utils";

const Navbar = () => {
  const location = useLocation();
  const params = useParams();
  return (
    <div
      className="fixed top-0 z-50 flex h-[70px] items-center w-full px-10 bg-[#F8F9FA]"
      style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.30)" }}
    >
      <div>
        {/* <button>
          <MenuButton />
        </button> */}
      </div>
      <div className="text-[#1E523E] text-[24px] font-bold absolute left-[40%] -translate-x-[50%]">
        <h1>{getNavTitle(location, params)}</h1>
      </div>
    </div>
  );
};

export default Navbar;
