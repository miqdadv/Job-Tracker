import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStatusFilter } from "@/redux/slices/trackerSlice";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const STATUS_OPTIONS = [
  { value: "", label: "All", color: "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700" },
  { value: "Applied", label: "Applied", color: "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800" },
  { value: "Interview", label: "Interview", color: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:hover:bg-yellow-800" },
  { value: "Offer", label: "Offer", color: "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-800" },
  { value: "Rejected", label: "Rejected", color: "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800" },
];

const FilterBar = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((store) => store.tracker);

  const handleStatusChange = (status) => {
    dispatch(setStatusFilter(status));
  };

  return (
    <div className="flex flex-wrap gap-2">
      {STATUS_OPTIONS.map((option) => {
        const isActive = filters.status === option.value;
        return (
          <Button
            key={option.value}
            variant="ghost"
            size="sm"
            onClick={() => handleStatusChange(option.value)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-all",
              option.color,
              isActive && "ring-2 ring-offset-2 ring-gray-400 dark:ring-gray-500"
            )}
          >
            {option.label}
          </Button>
        );
      })}
    </div>
  );
};

export default FilterBar;
