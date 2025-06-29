import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
const DashboardLayout = ({ children }) => {
  return (
    <div className="h-full relative">
      {/* Sidebar */}
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
        <Sidebar></Sidebar>
      </div>
      {/* Main Content Area */}
      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
