import React from 'react';
import SideBar from '../components/reusables/SideBar';
import Header from '../components/reusables/Header';
import { Search, PlusCircle, Clock, UserRound } from 'lucide-react';


const recipes = [
  { 
    id: 1, 
    title: 'Spaghetti Bolognese', 
    author: 'Jane Doe', 
    time: '30 mins',
    imageUrl: '/bolognese.jpg'
  },
  { 
    id: 2, 
    title: 'Fried Rice', 
    author: 'John Smith', 
    time: '45 mins',
    imageUrl: '/FriedRice.jpg'
  },
  { 
    id: 3, 
    title: 'Chicken Alfredo', 
    author: 'Emily Rose', 
    time: '40 mins',
    imageUrl: '/chiecken-alfred.jpg'
  },
  { 
    id: 4, 
    title: 'Lemon Herb Salmon', 
    author: 'Michael Chen', 
    time: '25 mins',
    imageUrl: '/salmon.jpg'
  },
  { 
    id: 5, 
    title: 'Vegetable Lasagna', 
    author: 'Sarah Lee', 
    time: '60 mins',
    imageUrl: '/vegetable.jpg'
  },
  { 
    id: 6, 
    title: 'Classic Pancakes', 
    author: 'David Kim', 
    time: '15 mins',
    imageUrl: '/pancake.jpg'
  },
];

const RecipeCard = ({ title, author, time, imageUrl }) => (
  <div className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300">
    <img src={imageUrl} alt={title} className="w-full h-[250px] object-cover" />
    
    <div className="p-3 flex flex-col gap-3 flex-1">
      <h3 className="text-lg font-bold text-white">{title}</h3>
      
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <UserRound size={18} />
        <span className="text-white font-medium">{author}</span>
      </div>
      
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <Clock size={18} />
        <span className="text-white font-medium">{time}</span>
      </div>
      
      <button className="mt-auto bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold py-2 rounded-lg transition-colors">
        View Recipe
      </button>
    </div>
  </div>
);


const RecipesDashboard = () => {
  return (
    <div className="flex bg-gray-900 min-h-screen text-gray-100">
      <SideBar />
      <div className="flex-1 flex flex-col ml-64 pt-16">
        <Header />
        <main className="p-6 md:p-8 flex-1">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Recipes</h1>
            <button className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-xl shadow-lg flex items-center space-x-2 transition-colors">
              <PlusCircle size={20} />
              <span>Add New Recipe</span>
            </button>
          </div>

          <div className="bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search recipes..."
                className="w-full bg-gray-700 text-gray-200 rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map(recipe => (
              <RecipeCard key={recipe.id} {...recipe} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default RecipesDashboard;