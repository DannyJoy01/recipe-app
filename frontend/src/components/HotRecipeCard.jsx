import React from "react";
import Timer from "../assets/icons/Timer.jsx";
import ViewRecipeBtn from "./reusables/Button.jsx";

const RecipeCard = ({
  badge,
  hotRecipeIcon,
  title,
  description,
  time,
  category,
  chefName,
  chefImage,
  date,
  recipeImage,
}) => {
  return (
    <div className="w-full font-inter flex p-12 justify-center">
      <div className="flex w-full justify-center items-center relative">
        <img
          src={badge}
          alt="Approved Badge"
          className="absolute top-8 left-1/2 -translate-x-1/2 max-w-[110px]"
        />
        {/*  */}
        <div className="w-[40%] h-full bg-lnd_blue text-black flex flex-col text-start items-start gap-5 p-8 rounded-tl-3xl rounded-bl-3xl">
          <div className="flex bg-white p-2 rounded-3xl gap-2 items-center text-xs font-semibold">
            <img src={hotRecipeIcon} alt="hot-recipe-icon" className="max-w-4" />
            <span className="pr-2">Hot Recipes</span>
          </div>
          <h1 className="text-5xl font-bold">{title}</h1>
          <p className="text-xs text-fade_txt font-light">{description}</p>
          <Timer time={time} category={category} />
          <div className="w-full flex items-center justify-between pt-20">
            <div className="flex items-center gap-3">
              <img src={chefImage} alt="Chef's Profile" className="max-w-10 rounded-full" />
              <div className="flex flex-col">
                <span className="text-xs font-bold">{chefName}</span>
                <span className="text-[11px] text-fade_txt">{date}</span>
              </div>
            </div>
            <div>
              <ViewRecipeBtn />
            </div>
          </div>
        </div>
        {/* Recipe Image */}
        <div className="w-[40%] h-full rounded-tr-3xl rounded-br-3xl overflow-hidden">
          <img src={recipeImage} alt="Hot Recipe Example" className="max-w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
