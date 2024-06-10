import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Helmet title="dashboard"/>
      {/* Sidebar */}
      <Sidebar />

      {/* Outlet --> Dynamic content */}
      <div className="flex-1 p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
