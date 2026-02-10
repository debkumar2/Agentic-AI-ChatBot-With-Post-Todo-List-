import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-8 py-4 bg-[#0b1b4e] text-white">
      <div className="navbar-brand">
        <NavLink className='font-bold text-[20px]'>Agentic AI with Todo</NavLink>
      </div>
      <ul className="flex gap-6">
        <li>
          <NavLink className='text-[16px] font-semibold' to='/'>Todo</NavLink>
        </li>
        <li>
          <NavLink className='text-[16px] font-semibold' to='/chatbot'>Chatbot</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
