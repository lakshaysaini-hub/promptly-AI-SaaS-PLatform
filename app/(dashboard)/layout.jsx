import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { getApiLimitCount } from "../../lib/api-limit";
const DashboardLayout = async ({ children }) => {
  const apiLimitCount = await getApiLimitCount();
  return (
    <div className="h-full relative">
      {/* Sidebar */}
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
        <Sidebar apiLimitCount={apiLimitCount} />
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
