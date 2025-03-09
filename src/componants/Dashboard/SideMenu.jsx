import { useState } from "react";
import { NavLink } from "react-router-dom";

const SideMenu = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { path: "trips", name: "Trips", icon: "fa-solid fa-bus" },
    { path: "category", name: "Category", icon: "fa-solid fa-list" },
    { path: "orders", name: "Orders", icon: "fa-solid fa-box" },
  ];

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="lg:hidden absolute top-4 left-4 text-white bg-blue-600 p-3 rounded-full z-50"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <i className={`fa-solid ${isSidebarOpen ? "fa-xmark" : "fa-bars"}`}></i>
      </button>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={closeSidebar}
        ></div>
      )}
      <nav
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:w-62 w-62 min-h-screen bg-blue-600 text-white flex flex-col p-4 space-y-4 fixed top-0 left-0 z-50 transition-all duration-300 ease-in-out transform border-r-4 border-gray-800`}
      >
        <button
          className="lg:hidden absolute top-4 right-4 text-white hover:text-gray-300"
          onClick={closeSidebar}
        >
          <i className="fa-solid fa-xmark text-2xl"></i>
        </button>

        <div className="mb-8">
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
          <p className="text-gray-300">Welcome</p>
        </div>
        <ul className="space-y-2 flex-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-500 font-semibold"
                      : "hover:bg-blue-500/80"
                  }`
                }
                onClick={closeSidebar}
              >
                <i className={item.icon}></i>
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SideMenu;