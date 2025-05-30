import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Search, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const [searchInput, setSearchInput] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput)}`);
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  const logoImageUrl = "https://i.ibb.co/spRKDrsP/FBB5-EB7-A-5-EDE-438-A-B53-C-746-C2-DFAA680.jpg";
  const defaultProfileImage = "https://cdn-icons-png.flaticon.com/512/847/847969.png";

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileMenuClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-primary py-2 px-4 md:px-6 shadow-md">
      <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
        {/* Left: Logo + Name */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3" onClick={() => setIsMobileMenuOpen(false)}>
            <img
              src={logoImageUrl}
              alt="โลโก้"
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <div className="hidden md:block rainbow-text text-xl md:text-2xl font-bold">Mee Rai Kin</div>
          </Link>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "ปิดเมนู" : "เปิดเมนู"}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Center: Search Bar */}
        <div className="relative flex-1 max-w-xs mx-auto md:mx-4">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              className="w-full py-2 px-4 pr-10 rounded-full border-none"
              placeholder="วัตถุดิบที่คุณมีคือ..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              aria-label="ค้นหาวัตถุดิบ"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800 hover:scale-110 transition-all duration-300"
              aria-label="ค้นหา"
            >
              <Search size={20} />
            </button>
          </form>
        </div>

        {/* ✅ Desktop Nav Links with wider spacing */}
        <nav className="hidden md:flex gap-8 text-white font-semibold text-shadow text-base">
          <Link to="/" className="hover:text-gray-800 transition-colors duration-300">หน้าหลัก</Link>
          <Link to="/popular-menu" className="hover:text-gray-800 transition-colors duration-300">เมนูยอดนิยม</Link>
          <Link to="/random-menu" className="hover:text-gray-800 transition-colors duration-300">สุ่มเมนู</Link>
          <Link to="/bmr-tdee" className="hover:text-gray-800 transition-colors duration-300">BMR & TDEE</Link>
          <Link to="/contact" className="hover:text-gray-800 transition-colors duration-300">ติดต่อเรา</Link>
        </nav>

        {/* Right: Auth */}
        <div className="flex items-center gap-3 text-white font-semibold text-shadow whitespace-nowrap">
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                <img
                  src={user?.profileImage || defaultProfileImage}
                  alt="รูปโปรไฟล์"
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                />
              </Link>
              <button
                onClick={logout}
                className="bg-gray-800 text-white py-1.5 px-4 rounded-full text-sm font-semibold shadow-md hover:bg-black transition-all duration-300 hover:scale-105 active:scale-95"
              >
                ออกจากระบบ
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                className="bg-primary-dark text-white py-1.5 px-4 rounded-full text-sm font-semibold shadow-md hover:bg-[#23825f] transition-all duration-300 hover:scale-105 active:scale-95"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                เข้าสู่ระบบ
              </Link>
              <Link
                to="/register"
                className="bg-[#f2994a] text-white py-1.5 px-4 rounded-full text-sm font-semibold shadow-md hover:bg-[#d9770c] transition-all duration-300 hover:scale-105 active:scale-95"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ลงทะเบียน
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <nav className="mt-2 w-full bg-primary shadow-md flex flex-col text-white font-semibold text-shadow text-base md:hidden z-50">
          <Link
            to="/"
            onClick={handleMobileMenuClick}
            className="px-6 py-3 border-b border-gray-700 hover:bg-gray-700 transition-colors"
          >
            หน้าหลัก
          </Link>
          <Link
            to="/popular-menu"
            onClick={handleMobileMenuClick}
            className="px-6 py-3 border-b border-gray-700 hover:bg-gray-700 transition-colors"
          >
            เมนูยอดนิยม
          </Link>
          <Link
            to="/random-menu"
            onClick={handleMobileMenuClick}
            className="px-6 py-3 border-b border-gray-700 hover:bg-gray-700 transition-colors"
          >
            สุ่มเมนู
          </Link>
          <Link
            to="/bmr-tdee"
            onClick={handleMobileMenuClick}
            className="px-6 py-3 border-b border-gray-700 hover:bg-gray-700 transition-colors"
          >
            BMR & TDEE
          </Link>
          <Link
            to="/contact"
            onClick={handleMobileMenuClick}
            className="px-6 py-3 hover:bg-gray-700 transition-colors"
          >
            ติดต่อเรา
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
