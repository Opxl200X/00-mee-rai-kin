import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecipeStore } from '../store/recipeStore';
import RecipeCard from '../components/recipe/RecipeCard';
import {
  ChefHat,
  Search,
  TrendingUp,
  DollarSign
} from 'lucide-react';

const HomePage = () => {
  const { recipes, popularRecipes } = useRecipeStore();
  const [searchInput, setSearchInput] = useState('');
  const [randomRecipes, setRandomRecipes] = useState([]);

  useEffect(() => {
    const getRandomRecipes = () => {
      const shuffled = [...recipes].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 6);
    };

    setRandomRecipes(getRandomRecipes());
  }, [recipes]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchInput)}`;
    }
  };

  const displayedRecipes = popularRecipes.length >= 6
    ? popularRecipes.slice(0, 6)
    : [
        ...popularRecipes,
        ...recipes
          .filter((r) => !popularRecipes.includes(r))
          .slice(0, 6 - popularRecipes.length),
      ];

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836')] bg-cover bg-center text-white py-16 md:py-24"
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1
            className="text-4xl md:text-5xl font-bold mb-6 animate-fade-down"
            style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}
          >
            มีอะไรกิน? ค้นหาเมนูจากวัตถุดิบที่คุณมี
          </h1>
          <p
            className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90"
            style={{ textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7)' }}
          >
            แค่บอกเราว่าคุณมีอะไรในตู้เย็น เราจะแนะนำเมนูอาหารที่ทำได้ทันที!
          </p>

          <form onSubmit={handleSearch} className="max-w-xl mx-auto relative">
            <input
              type="text"
              className="w-full py-3 px-6 pr-12 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-lg"
              placeholder="วัตถุดิบที่คุณมีตอนนี้คือ..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-primary-dark p-2 rounded-full hover:bg-primary transition-all duration-300"
            >
              <Search size={20} className="text-white" />
            </button>
          </form>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">เราช่วยคุณได้อย่างไร</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-background rounded-lg shadow-md transform transition-all duration-300 hover:scale-105">
              <div className="flex justify-center mb-4">
                <ChefHat size={48} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">ค้นหาเมนูจากวัตถุดิบ</h3>
              <p className="text-gray-600">ใส่วัตถุดิบที่คุณมี เราจะแนะนำเมนูที่ทำได้ทันที</p>
            </div>
            <div className="text-center p-6 bg-background rounded-lg shadow-md transform transition-all duration-300 hover:scale-105">
              <div className="flex justify-center mb-4">
                <TrendingUp size={48} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">คำนวณ BMR & TDEE</h3>
              <p className="text-gray-600">คำนวณพลังงานที่ร่างกายต้องการ <br />และวางแผนอาหารให้เหมาะสม</p>
            </div>
            <div className="text-center p-6 bg-background rounded-lg shadow-md transform transition-all duration-300 hover:scale-105">
              <div className="flex justify-center mb-4">
                <DollarSign size={48} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">ประหยัดค่าใช้จ่าย</h3>
              <p className="text-gray-600">ใช้วัตถุดิบที่มีอยู่แล้วให้คุ้มค่า ลดการทิ้งอาหาร</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Recipes */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              เมนูแนะนำ
            </h2>
            <Link
              to="/search"
              className="text-primary-dark hover:text-primary font-semibold transition-colors duration-300"
            >
              ดูทั้งหมด →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
