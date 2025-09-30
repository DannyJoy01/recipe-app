import React from "react";
import RecipeCard from "../components/HotRecipeCard.jsx";
import recipeData from "../data/HotRecipeData.js";
import RecipeCategory from "../pages/Categories.jsx";
import Header from "../components/reusables/Header.jsx";

const Home = () => {
  return (
    <>
    <Header />
    <div className="w-full flex flex-col items-center justify-center gap-14">
      
      {recipeData.map((recipe, index) => (
        <RecipeCard key={index} {...recipe} />
      ))}
      <RecipeCategory />
    </div>
      
    </>
  );
};

export default Home;
