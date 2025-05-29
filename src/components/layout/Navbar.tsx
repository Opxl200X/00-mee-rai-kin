import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Search } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const [searchInput, setSearchInput] = useState('');
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

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-primary py-2 px-4 md:px-6 flex items-center justify-between flex-wrap shadow-md">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-3">
          <img 
            src={logoImageUrl}
            alt="โลโก้" 
            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
          />
          <div className="rainbow-text text-xl md:text-2xl font-bold">Mee Rai Kin</div>
        </Link>
      </div>

      <div className="relative flex-1 max-w-xs mx-4 my-2 md:my-0">
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

      <nav className="flex items-center gap-4 md:gap-6 flex-wrap text-white font-semibold text-shadow">
        <Link to="/" className="hidden md:block hover:text-gray-800 transition-colors duration-300">หน้าหลัก</Link>
        <Link to="/popular-menu" className="hidden md:block hover:text-gray-800 transition-colors duration-300">เมนูยอดนิยม</Link>
        <Link to="/random-menu" className="hidden md:block hover:text-gray-800 transition-colors duration-300">สุ่มเมนู</Link>
        <Link to="/bmr-tdee" className="hidden md:block hover:text-gray-800 transition-colors duration-300">BMR & TDEE</Link>
        <Link to="/contact" className="hidden md:block hover:text-gray-800 transition-colors duration-300">ติดต่อเรา</Link>
        
        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <Link to="/profile" className="flex items-center">
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
          </div>
        ) : (
          <div className="flex gap-2">
            <Link 
              to="/signin" 
              className="bg-primary-dark text-white py-1.5 px-4 rounded-full text-sm font-semibold shadow-md hover:bg-[#23825f] transition-all duration-300 hover:scale-105 active:scale-95"
            >
              เข้าสู่ระบบ
            </Link>
            <Link 
              to="/register" 
              className="bg-[#f2994a] text-white py-1.5 px-4 rounded-full text-sm font-semibold shadow-md hover:bg-[#d9770c] transition-all duration-300 hover:scale-105 active:scale-95"
            >
              ลงทะเบียน
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
