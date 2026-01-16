import React from "react";
import { useDispatch } from "react-redux";
import { removeBookmark } from "@/redux/slices/bookmarkSlice";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { X, Building2, MapPin, DollarSign, Briefcase } from "lucide-react";

const BookmarkedJobCard = ({ job }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeBookmark(job._id));
  };

  return (
    <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleRemove}
        className="absolute top-2 right-2 h-6 w-6 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
      >
        <X className="h-4 w-4" />
      </Button>

      <div className="pr-8">
        <div className="flex items-center gap-2 mb-2">
          <Building2 className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {job.company?.name || "Unknown Company"}
          </span>
        </div>

        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
          {job.title}
        </h3>

        <div className="flex flex-wrap gap-2 mb-3">
          {job.location && (
            <Badge variant="outline" className="flex items-center gap-1 text-xs">
              <MapPin className="h-3 w-3" />
              {job.location}
            </Badge>
          )}
          {job.salary && (
            <Badge variant="outline" className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
              <DollarSign className="h-3 w-3" />
              {job.salary} LPA
            </Badge>
          )}
          {job.jobType && (
            <Badge variant="secondary" className="flex items-center gap-1 text-xs">
              <Briefcase className="h-3 w-3" />
              {job.jobType}
            </Badge>
          )}
        </div>

        {job.description && (
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
            {job.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default BookmarkedJobCard;
