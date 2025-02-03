import React from "react";
import { FaSearch } from "react-icons/fa";

type SearchInputProps = {
  searchQuery: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

// SearchInput component renders a search bar for searching cars.
const SearchInput: React.FC<SearchInputProps> = ({
  searchQuery,
  handleSearch,
}) => {
  return (
    <div className="relative mb-4 w-full max-w-full">
      <input
        type="text"
        placeholder="Search Car by Brand (Tesla), Model, Year..."
        value={searchQuery}
        onChange={handleSearch} // Trigger search on input change
        className="px-12 py-3 w-full sm:w-[24rem] md:w-[36rem] lg:w-[48rem] xl:w-[56rem] rounded-full border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-x-auto break-words resize-none"
      />
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
    </div>
  );
};

export default SearchInput;
