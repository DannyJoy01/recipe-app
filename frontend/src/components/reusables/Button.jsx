import React from 'react'
import PlayButton from '../../assets/icons/PlayCircle.svg'; // Assuming this is the path to the play button icon

const ViewRecipeBtn = () => {
  return (
    <div>
      <button className=" bg-black text-white text-[11px]  p-3 pl-6 pr-6 rounded-lg gap-2 flex justify-center">
        View Recipe
        <img src={PlayButton} alt="Play Button" className="max-w-4" />
      </button>
    </div>
  )
}

export default ViewRecipeBtn;

