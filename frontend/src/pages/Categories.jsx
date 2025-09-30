import React, { useState } from 'react';
import categoriesData from '../data/categoriesData';
import CategoryCard from '../components/reusables/CategoryCard.jsx';
import ViewAllCategory from '../components/reusables/ViewAllCategory.jsx';

const Categories = () => {
  const [viewAll, setViewAll] = useState(false);

  const displayedCategories = viewAll ? categoriesData : categoriesData.slice(0, 6);

  return (
    <div className="w-full text-black flex flex-col justify-center items-center font-inter ">
      <div className="w-[80%] flex flex-col justify-between">
        <div className="flex justify-between items-center p-4">
          <h1 className="text-3xl font-bold">Categories</h1>
          <ViewAllCategory onClick={() => setViewAll(!viewAll)}>
            {viewAll ? 'View Less Categories' : 'View All Categories'}
          </ViewAllCategory>
        </div>

        <div className="w-full flex p-4 gap-4 items-center flex-wrap">
          {displayedCategories.map(({ id, name, icon, shadow, gradientFrom }) => (
            <CategoryCard
              key={id}
              name={name}
              icon={icon}
              shadow={shadow}
              gradientFrom={gradientFrom}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
