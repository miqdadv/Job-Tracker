import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchFilter } from "@/redux/slices/trackerSlice";
import { Input } from "../ui/input";
import { Search, X } from "lucide-react";

const SearchInput = ({ debounceMs = 300 }) => {
  const dispatch = useDispatch();
  const { filters } = useSelector((store) => store.tracker);
  const [localSearch, setLocalSearch] = useState(filters.search || "");

  // Sync local state when Redux state changes externally (e.g., clear filters)
  useEffect(() => {
    setLocalSearch(filters.search || "");
  }, [filters.search]);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== filters.search) {
        dispatch(setSearchFilter(localSearch));
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [localSearch, debounceMs, dispatch, filters.search]);

  const handleClear = () => {
    setLocalSearch("");
    dispatch(setSearchFilter(""));
  };

  return (
    <div className="relative w-full sm:w-80 md:max-w-sm">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
      <Input
        type="text"
        placeholder="Search by company or role..."
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        className="pl-10 pr-10"
      />
      {localSearch && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
