import { useState } from 'react';

const SearchInput = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <div className="relative mt-6 mb-4 max-w-lg mx-auto">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          className="w-5 h-5 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>
      <input
        type="search"
        id="default-search"
        className="block w-full p-4 pl-10 text-sm text-black border border-blue-500 rounded-lg bg-white focus:ring-yellow-400 focus:border-yellow-400"
        placeholder="Buscar Trabajos.."
        required
        value={query}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchInput;
