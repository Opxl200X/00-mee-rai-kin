import { useRecipeStore } from '../store/recipeStore';
import { useNavigate } from 'react-router-dom';

const PopularMenuPage = () => {
  const { popularRecipes } = useRecipeStore();
  const navigate = useNavigate();
  
  const handleMenuClick = (id: string) => {
    navigate(`/menu/${id}`);
  };
  
  const barColors = [
    { base: '#ff5c5c', hover: '#ff4040' }, // 1st place
    { base: '#ffd93b', hover: '#ffeb3b' }, // 2nd place
    { base: '#3bff3b', hover: '#3bff75' }, // 3rd place
    { base: '#5caeff', hover: '#5cb8ff' }, // 4th place
    { base: '#ff5cff', hover: '#ff6bff' }  // 5th place
  ];
  
  // Calculate heights based on ranking
  const getHeight = (index: number) => {
    const heights = [300, 280, 260, 240, 220];
    return heights[index] || 200;
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-pink-200 py-6 rounded-xl text-center mb-16">
          <h1 className="text-4xl font-bold">เมนูยอดนิยมประจำเดือน</h1>
        </div>
        
        <div className="flex justify-center items-end gap-8 md:gap-16 mt-24">
          {popularRecipes.slice(0, 5).map((recipe, index) => (
            <div key={recipe.id} className="flex flex-col items-center">
              <div 
                className="relative cursor-pointer transition-all duration-400 ease-out"
                style={{ 
                  height: `${getHeight(index)}px`, 
                  width: '100px',
                  backgroundColor: barColors[index].base,
                  borderRadius: '10px 10px 0 0',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  marginTop: '40px'
                }}
                onClick={() => handleMenuClick(recipe.id)}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = barColors[index].hover;
                  e.currentTarget.style.transform = 'scale(1.05) rotate(5deg)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.25)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = barColors[index].base;
                  e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div 
                  className="absolute top-[-50px] w-[100px] h-[100px] bg-white rounded-full overflow-hidden flex items-center justify-center border-4 border-gray-200"
                  style={{ transition: 'transform 0.6s ease' }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'rotate(360deg)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'rotate(0deg)';
                  }}
                >
                  <img 
                    src={recipe.imageUrl}
                    alt={recipe.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-2xl font-bold mb-2">{index + 1}</span>
              </div>
              <div className="mt-3 text-center w-32">
                <h3 className="font-medium text-lg">{recipe.title}</h3>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-24">
          <h2 className="text-2xl font-bold mb-6">เมนูยอดนิยมอื่นๆ</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularRecipes.slice(5).map((recipe) => (
              <div 
                key={recipe.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => handleMenuClick(recipe.id)}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{recipe.title}</h3>
                  <div className="flex justify-between text-sm">
                    <span>⏱️ {recipe.cookTime} นาที</span>
                    <span>🔥 {recipe.calories} cal</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularMenuPage;