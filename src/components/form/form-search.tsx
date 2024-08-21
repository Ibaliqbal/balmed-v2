"use client";
import { IoSearchOutline } from "react-icons/io5";
import Input from "../ui/input";
import { ComponentPropsWithoutRef, FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Search = ({
  className,
  defaultValue,
  ...rest
}: ComponentPropsWithoutRef<"form">) => {
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
      className={`${className} flex items-center gap-4 bg-slate-700 rounded-full pl-5`}
      onSubmit={handleSearch}
      {...rest}
    >
      <IoSearchOutline aria-label="Search" className="font-bold text-xl" />
      <Input
        type="search"
        className="w-full py-5 rounded-e-full px-4 bg-slate-700 outline-none"
        placeholder="Search something..."
        name="search"
        defaultValue={defaultValue}
      />
    </form>
  );
};

export default Search;
