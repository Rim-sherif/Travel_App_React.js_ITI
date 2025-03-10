import { Outlet } from 'react-router-dom';
import SideMenu from './SideMenu';

const DashboardLayout = () => {
  return (
    <div className="flex  flex-col min-h-screen ">
      <SideMenu />
      <main className="flex-1 p-8 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;