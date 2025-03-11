import { Outlet } from 'react-router-dom';
import SideMenu from './SideMenu';

const DashboardLayout = () => {
  return (
    <div className="grid lg:grid-cols-[250px_1fr] min-h-screen">
      <SideMenu />
      <main className="p-8 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
