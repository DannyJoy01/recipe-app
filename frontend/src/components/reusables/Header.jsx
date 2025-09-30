import React from "react";
import { Link } from "react-router-dom";
import HeaderIcon from "../../assets/icons/HeaderIcon";
import Logo from "../../assets/icons/Logo";
const Header = () => {
  return (
    <div>
      <header className="w-full bg-white text-black p-7 border-b-2 flex justify-around items-center font-inter">
        <Logo />
        <ul className="flex gap-16 ">
          <li className="hover:text-orange-500 transition-colors duration-300">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-orange-500 transition-colors duration-300">
            <Link to="/recipes">Recipes</Link>
          </li>
          <li className="hover:text-orange-500 transition-colors duration-300">
            <Link to="/about">About Us</Link>
          </li>
          <li className="hover:text-orange-500 transition-colors duration-300">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        {/*  */}
        <div className="flex justify-between gap-5 items-center ">
          <div className="text-orange-500 font-semibold">
          <Link to="/register" className="hover:text-black transition-colors duration-300"> Register </Link>
            <span >/</span>
           <Link to="/login" className="hover:text-black transition-colors duration-300"> Login </Link>
           </div>
          <div>
            <HeaderIcon />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
