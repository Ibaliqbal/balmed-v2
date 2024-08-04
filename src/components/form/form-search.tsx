"use client";
import { IoSearchOutline } from "react-icons/io5";
import Input from "../ui/input";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Search = () => {
  const router = useRouter();
  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const searchQuery = target.search.value;

    if (!searchQuery || searchQuery.trim() === "") {
      toast.error("Input search cannot be empty");
      return;
    }
    // TODO: Implement search logic here
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
  }
  return (
    <form
      className="flex items-center gap-4 text-white bg-slate-700 rounded-full pl-5"
      onSubmit={handleSearch}
    >
      <IoSearchOutline aria-label="Search" className="font-bold text-xl" />
      <Input
        type="search"
        className="w-full py-5 rounded-e-full px-4 bg-slate-700 outline-none"
        placeholder="Search"
        name="search"
      />
    </form>
  );
};

export default Search;
