import React from 'react';

const CategoryCard = ({ name, icon, shadow, gradientFrom }) => {
  return (
    <div
      className="w-[14%] flex flex-col items-center rounded-xl bg-white overflow-hidden"
      style={{ boxShadow: shadow }}
    >
      {/* Icon div */}
      <div className="w-full flex items-center justify-center">
        <img src={icon} alt={`${name} Icon`} className="max-w-[65px]" />
      </div>

      {/* Text div */}
      <div
        className="w-full pb-4 pt-10 text-[12px] font-semibold text-center text-black rounded-b-xl shadow-2xl"
        style={{
          background: `linear-gradient(to top, ${gradientFrom}, #FFFFFF)`,
        }}
      >
        <p>{name}</p>
      </div>
    </div>
  );
};

export default CategoryCard;
