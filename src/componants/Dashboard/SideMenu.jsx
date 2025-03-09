import { NavLink } from 'react-router-dom';

const SideMenu = () => {
  const menuItems = [
    { path: 'overview', name: 'Overview', icon: '🏠' },
    { path: 'users', name: 'Users', icon: '👥' },
  ];

  return (
    <nav className="w-64 min-h-screen bg-amber-300 flex flex-col p-4 space-y-4">

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-black">Admin Dashboard</h2>
        <p className="text-gray-700">Welcome</p>
      </div>

      <ul className="space-y-2 flex-1">
        {menuItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) => 
                `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-amber-400 font-semibold' 
                    : 'hover:bg-amber-400/80'
                }`
              }
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>

 
      <button className="mt-auto w-full py-2 px-4 bg-amber-400 hover:bg-amber-500 rounded-lg transition-colors text-black font-medium">
        Log Out
      </button>
    </nav>
  );
};

export default SideMenu;