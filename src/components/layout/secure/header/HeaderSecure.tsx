import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi'; 
import { authService } from '../../../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import { set } from 'react-hook-form';

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<{ mail: string; role: string } | null>(null); // État pour les infos de l'utilisateur
  const navigate = useNavigate();

  useEffect(() => {
    const tokenInfo = authService.getTokenInfo();
    if (tokenInfo) {
      setUserInfo(tokenInfo);
      console.log(setUserInfo)
    }
  }, []);

  const handleDropdownToggle = () => {
    setDropdownOpen(prevState => !prevState);
  };

  const handleClick = () => {
    authService.logout();
    navigate('/login', { replace: true });
};

  return (
    <header className="fixed top-0 left-64 right-0 bg-white shadow-md px-4 h-16 z-10 flex justify-between items-center">
      <div className="flex-1 lg:flex-none w-full lg:w-1/3 relative">
        <input
          type="text"
          placeholder="Rechercher dans votre boutique..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
        <FiSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400" /> 
      </div>

      <div className="relative">
        <button onClick={handleDropdownToggle} className="flex items-center focus:outline-none">
          <img
            src="https://plus.unsplash.com/premium_photo-1677675594688-f7bc0a870930?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHJvZmlsJTIwYWZyaWNhaW58ZW58MHx8MHx8fDA%3D"
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
          <h1 className='px-4 text-xl font-bold'>{userInfo?.mail}</h1> {/* Affiche le mail de l'utilisateur */}
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
            <div className="p-4 border-b">
              <img
                src="https://plus.unsplash.com/premium_photo-1677675594688-f7bc0a870930?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHJvZmlsJTIwYWZyaWNhaW58ZW58MHx8MHx8fDA%3D"
                alt="Profile"
                className="w-12 h-12 rounded-full mx-auto"
              />
              <span className="block text-center text-gray-700 mt-2">{userInfo?.mail}</span> {/* Affiche le mail */}
              <span className="block text-center text-gray-700 mt-2">{userInfo?.role}</span> {/* Affiche le rôle */}
            </div>
            <div className="py-2">
              <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Modifier Profile</a>
              <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-100" onClick={handleClick}>
                Déconnexion
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
