// src/layouts/Layout.tsx
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* ✅ Padding ด้านบน 6rem (96px) เพื่อไม่ให้ถูก Navbar ทับ */}
      <main className="flex-grow pt-24 px-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
