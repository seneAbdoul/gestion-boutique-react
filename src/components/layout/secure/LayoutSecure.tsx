import { Outlet } from 'react-router-dom';
import Header from './header/HeaderSecure';
import Sidebar from './sidebar/SidebarSecure';
import { height } from '@fortawesome/free-solid-svg-icons/fa0';

const LayoutSecure = () => {
  return (
    <div >
      <Header />
      <div>
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutSecure;



