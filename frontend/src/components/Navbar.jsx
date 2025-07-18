import React, { useState } from "react";

const Navbar = ({ onAddUserClick, onListClick }) => {
  const [activeButton, setActiveButton] = useState("add");
  const ButtonDesign1 = `flex-1 py-2 sm:py-3 px-2 sm:px-3 rounded-lg cursor-pointer font-semibold shodow-lg transition  ${
    activeButton === "add" ? "bg-red-500 text-white" : "text-white "
  }`;
  const ButtonDesign2 = `flex-1 py-2 sm:py-3 px-2 sm:px-3 rounded-lg cursor-pointer font-semibold shodow-lg transition ${
    activeButton === "list" ? "bg-red-500 text-white" : " text-white "
  }`;
  const addUserHandler = () => {
    setActiveButton("add");
    onAddUserClick();
  };
  const listHandler = () => {
    setActiveButton("list");
    onListClick();
  };
  return (
    // button to add users
    <div className="bg-gradient-to-r from-[#020024] via-[#040208] to-[#1c1c52] max-w-xl sm:max-w-2xl px-2 py-1 shadow-lg mx-auto rounded-xl flex flex-col md:flex-row justify-around gap-2 sm:gap-1 text-white ">
      <button className={ButtonDesign1} onClick={addUserHandler}>
        Add user
      </button>
      {/* button to open list and claim points */}
      <button className={ButtonDesign2} onClick={listHandler}>
        List
      </button>
    </div>
  );
};

export default Navbar;
