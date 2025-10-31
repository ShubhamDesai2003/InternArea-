import { useState } from "react";

interface FilterBarProps{
    onFilterChange: (filters: { category: string; location: string }) => void;
}


export default function FilterBar({ onFilterChange }: FilterBarProps) {
    const [category, setCategory] = useState("");
    const [location, setLocation] = useState("");
  
    const handleFilter = () => {
      onFilterChange({ category, location });
    };
  
    return (
      <div className="bg-white shadow-md rounded-xl p-4 mb-10 flex flex-col md:flex-row gap-4 md:items-end justify-between">
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="flex flex-col w-full md:w-1/3">
            <label className="text-sm font-medium text-gray-600 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="">All Categories</option>
              <option value="IT">IT</option>
              <option value="Marketing">Marketing</option>
              <option value="Design">Design</option>
              <option value="Finance">Finance</option>
            </select>
          </div>
  
          <div className="flex flex-col w-full md:w-1/3">
            <label className="text-sm font-medium text-gray-600 mb-1">Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="">All Locations</option>
              <option value="Pune">Pune</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
        </div>
  
        <button
          onClick={handleFilter}
          className="bg-blue-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
        >
          Apply Filters
        </button>
      </div>
    );
  }
