import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecipeStore } from '../store/recipeStore';
import RecipeCard from '../components/recipe/RecipeCard';
import { Search, Filter } from 'lucide-react';

const SearchResultsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q') || '';

  const { searchRecipes, searchResults } = useRecipeStore();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // สำหรับ toggle popup

  const filters = [
    'มังสวิรัติ',
    'ฮาลาล',
    'คีโต',
    'โปรตีนสูง',
    'ฟาสต์ฟู้ด',
    'อาหารเจ',
    'อาหารคลีน',
    'สุขภาพ'
  ];

  useEffect(() => {
    searchRecipes(searchQuery, selectedFilters);
  }, [searchQuery, selectedFilters, searchRecipes]);

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <div className="py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">ผลการค้นหา</h1>

        {/* Mobile Filter Button ด้านซ้ายบน */}
        <div className="md:hidden mb-4 flex justify-start">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-full shadow"
          >
            <Filter size={18} /> ตัวกรอง
          </button>
        </div>

        {/* Filter Modal Popup for Mobile */}
        {isFilterOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setIsFilterOpen(false)} // คลิก background ปิด popup
          >
            <div
              className="bg-white rounded-xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto"
              onClick={e => e.stopPropagation()} // ป้องกันคลิกใน modal ปิด popup
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">ตัวกรอง</h2>
                <button
                  className="text-gray-500 text-2xl font-bold leading-none"
                  onClick={() => setIsFilterOpen(false)}
                  aria-label="ปิดตัวกรอง"
                >
                  &times;
                </button>
              </div>
              <div className="space-y-3">
                {filters.map(filter => (
                  <button
                    key={filter}
                    className={`w-full py-2 px-4 rounded-full text-left transition-colors duration-300 ${
                      selectedFilters.includes(filter)
                        ? 'bg-[#ff69b4] text-white'
                        : 'bg-white border-2 border-[#ff69b4] hover:bg-pink-100'
                    }`}
                    onClick={() => toggleFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Layout Desktop และ Mobile (ซ่อน filter sidebar บน mobile) */}
        <div className="flex flex-row gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-secondary rounded-xl p-4 sticky top-24">
              <h2 className="text-xl font-bold mb-4">ตัวกรอง</h2>

              <div className="space-y-3">
                {filters.map(filter => (
                  <button
                    key={filter}
                    className={`w-full py-2 px-4 rounded-full text-left transition-colors duration-300 ${
                      selectedFilters.includes(filter)
                        ? 'bg-[#ff69b4] text-white'
                        : 'bg-white border-2 border-[#ff69b4] hover:bg-pink-100'
                    }`}
                    onClick={() => toggleFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Search Results */}
          <div className="flex-1">
            <form className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="ค้นหาเมนูอาหาร..."
                  value={searchQuery}
                  readOnly
                  className="w-full py-3 px-5 pr-12 bg-pink-100 rounded-full text-gray-800 cursor-not-allowed"
                />
                <button
                  type="submit"
                  disabled
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-not-allowed"
                >
                  <Search size={20} />
                </button>
              </div>
            </form>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map(recipe => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-8 text-center">
                <p className="text-gray-600 mb-4">
                  ไม่พบเมนูอาหารที่ตรงกับการค้นหา "{searchQuery}"
                </p>
                <p className="text-gray-500">
                  ลองค้นหาด้วยคำอื่น หรือเลือกเมนูจากหมวดหมู่ด้านซ้าย
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
