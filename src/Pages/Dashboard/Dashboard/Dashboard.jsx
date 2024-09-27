import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
  return (
    <div className="min-h-screen lg:flex flex-col md:flex-row">
      <Helmet title="dashboard"/>
      {/* Sidebar */}
      <Sidebar />

      {/* Outlet --> Dynamic content */}
      <div className="w-full ">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
