import { Outlet } from 'react-router-dom';
import SideMenu from './SideMenu';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex">
      <SideMenu />
      <main className="flex-1 p-8 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;