import React from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import DashboardNavbar from "../../../components/Navbar/DashboardNavbar";
import Siswa from "./Siswa";

const SiswaDashboard = () => {
  return (
    <div className="min-h-screen font-poppins bg-gray-200">
      <DashboardNavbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6 md:ml-64">
          {/* content disini */}
          <Siswa />
        </div>
      </div>
    </div>
  );
};

export default SiswaDashboard;
