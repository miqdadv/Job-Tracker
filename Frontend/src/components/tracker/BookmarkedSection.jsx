import React from "react";
import { useSelector } from "react-redux";
import BookmarkedJobCard from "./BookmarkedJobCard";
import { Badge } from "../ui/badge";
import { Bookmark, BookmarkX } from "lucide-react";

const BookmarkedSection = () => {
  const { bookmarkedJobs } = useSelector((store) => store.bookmark);

  return (
    <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <Bookmark className="h-6 w-6 text-gray-700 dark:text-gray-300" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Bookmarked Jobs
        </h2>
        <Badge variant="secondary" className="ml-1">
          {bookmarkedJobs.length}
        </Badge>
      </div>

      {bookmarkedJobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
          <BookmarkX className="h-12 w-12 mb-4 text-gray-300 dark:text-gray-600" />
          <p className="text-lg font-medium">No bookmarked jobs</p>
          <p className="text-sm mt-1">
            Save jobs you're interested in by clicking the bookmark icon
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookmarkedJobs.map((job) => (
            <BookmarkedJobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarkedSection;
