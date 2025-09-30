import React from 'react';
import timerIcon from "../icons/Timer.svg"; // Assuming Timer is an SVG icon
import Tool from "../icons/tool.icon.svg"; // Assuming Tool is another SVG icon

const Timer = ({ time, category }) => { // Destructure props here
  return (
    <div className="flex items-center text-fade_txt text-[10px] gap-3 font-semibold font-inter">
      <div className='flex items-center justify-around gap-1 bg-grey-100 p-[5px] rounded-2xl bg-grey_fill'>
        <img src={timerIcon} alt="Timer Icon" className='max-w-4'/>
        <span className='pr-2'>{time}</span> {/* Use the 'time' prop */}
      </div>
      <div className='flex items-center justify-around gap-1 bg-grey-100 p-[5px] rounded-2xl bg-grey_fill'>
        <img src={Tool} alt="Tool Icon" className='max-w-4'/>
        <span className='pr-2'>{category}</span> {/* Use the 'category' prop */}
      </div>
    </div>
  );
};

export default Timer;