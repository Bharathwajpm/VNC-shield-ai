import CyberSidebar from "@/components/CyberSidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => (
  <div className="min-h-screen bg-background cyber-grid">
    <CyberSidebar />
    <main className="ml-64 p-6 min-h-screen relative">
      <div className="scan-line absolute inset-0 pointer-events-none z-0" />
      <div className="relative z-10">
        <Outlet />
      </div>
    </main>
  </div>
);

export default DashboardLayout;
