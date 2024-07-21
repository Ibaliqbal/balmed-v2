import React from "react";
import { IoSearchOutline } from "react-icons/io5";

const Search = () => {
  return (
    <form className="flex items-center gap-4 text-white bg-slate-700 rounded-full pl-5">
      <IoSearchOutline aria-label="Search" className="font-bold text-xl" />
      <input
        type="text"
        className="w-full py-5 rounded-e-full px-4 bg-slate-700 outline-none"
        placeholder="Search"
        name="search"
      />
    </form>
  );
};

export default Search;
