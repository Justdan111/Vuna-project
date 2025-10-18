import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const UserLayout = () => {
  return (
    <>
      <section className="flex h-screen w-full fixed">
        <Sidebar />
        <div className="bg-[#F8F9FA] w-full h-screen overflow-scroll relative z-10">
          <Navbar />
          <>
            <Outlet />
          </>
        </div>
      </section>
    </>
  );
};

export default UserLayout;
