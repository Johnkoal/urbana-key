
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Inicio', icon: 'home', path: '/' },
    { label: 'Accesos', icon: 'security', path: '/accesses' },
    { label: 'Comunidad', icon: 'groups', path: '/community' },
    { label: 'Pagos', icon: 'payments', path: '/payments' },
    { label: 'Perfil', icon: 'person', path: '/profile' }
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 px-4 pb-6 pt-2 flex justify-between items-center z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center gap-1 w-16 transition-colors ${
              isActive ? 'text-primary' : 'text-gray-400'
            }`}
          >
            <span className={`material-symbols-outlined ${isActive ? 'filled' : ''}`}>
              {item.icon}
            </span>
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default Navbar;
