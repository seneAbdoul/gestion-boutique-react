import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'; // Importer NavLink
import { FiHome, FiDollarSign, FiUsers, FiBox, FiClipboard, FiUser } from 'react-icons/fi'; // Icons

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Fonction pour gérer la fermeture de la sidebar
  const closeSidebar = () => setIsOpen(false);

  // Fonction pour définir les classes des NavLink en fonction de l'état actif
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center px-6 py-4 border-b border-gray-700 hover:bg-blue-700 ${
      isActive ? 'bg-blue-700' : ''
    }`;

  return (
    <>
      {/* Button to toggle sidebar on small screens */}
      <button
        className="lg:hidden fixed top-4 left-4 z-30 text-white bg-blue-900 p-2 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Sidebar"
      >
        &#9776; {/* Hamburger Icon */}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-20 w-64 h-full text-white flex flex-col transition-transform transform lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          background: "linear-gradient(to right, #1E3A8A, #0F172A)" // Gradient from blue to dark
        }}
      >
        <div className="flex items-center justify-center h-16 bg-blue-800">
          {/* Logo SVG */}
          <svg
            className="w-12 h-12 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="40" height="24" rx="4" fill="white"></rect>
            <path
              d="M17 8H7C5.89543 8 5 8.89543 5 10V16C5 17.1046 5.89543 18 7 18H17C18.1046 18 19 17.1046 19 16V10C19 8.89543 18.1046 8 17 8Z"
              stroke="#1E40AF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M12 12C12.5523 12 13 11.5523 13 11C13 10.4477 12.5523 10 12 10C11.4477 10 11 10.4477 11 11C11 11.5523 11.4477 12 12 12Z"
              stroke="#1E40AF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M16 16H8"
              stroke="#1E40AF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <h1 className="text-2xl font-bold">GESTION BOUTIQUE</h1>
        </div>
        <nav className="flex-grow mt-10">
          <ul className="space-y-4">
            <li>
              <NavLink to="/boutique/dashboard" className={getNavLinkClass} onClick={closeSidebar}>
                <FiHome className="mr-3" />
                DASHBOARD
              </NavLink>
            </li>
            <li>
              <NavLink to="/boutique/dette" className={getNavLinkClass} onClick={closeSidebar}>
                <FiDollarSign className="mr-3" />
                DETTES
              </NavLink>
            </li>
            <li>
              <NavLink to="/boutique/client" className={getNavLinkClass} onClick={closeSidebar}>
                <FiUsers className="mr-3" />
                CLIENTS
              </NavLink>
            </li>
            <li>
              <NavLink to="/boutique/article" className={getNavLinkClass} onClick={closeSidebar}>
                <FiBox className="mr-3" />
                ARTICLES
              </NavLink>
            </li>
            <li>
              <NavLink to="/boutique/demande" className={getNavLinkClass} onClick={closeSidebar}>
                <FiClipboard className="mr-3" />
                DEMANDES
              </NavLink>
            </li>
            <li>
              <NavLink to="/utilisateurs" className={getNavLinkClass} onClick={closeSidebar}>
                <FiUser className="mr-3" />
                UTILISATEURS
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      {/* Overlay pour fermer la sidebar sur les petits écrans */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10 lg:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        ></div>
      )}
    </>
  );
};

export default Sidebar;
