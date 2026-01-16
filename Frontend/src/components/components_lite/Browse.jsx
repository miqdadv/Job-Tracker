import React from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import Job from "./Job";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { Loader2, Search } from "lucide-react";

const Browse = () => {
  const { allJobs, searchedQuery, loading } = useSelector((store) => store.job);

  // Fetch jobs from API (uses searchedQuery for server-side filtering)
  useGetAllJobs();

  // Additional client-side filtering for better UX
  const filteredJobs = allJobs.filter((job) => {
    if (!searchedQuery) return true;
    const query = searchedQuery.toLowerCase();
    return (
      job.title?.toLowerCase().includes(query) ||
      job.company?.name?.toLowerCase().includes(query) ||
      job.location?.toLowerCase().includes(query)
    );
  });

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
        <h1 className="font-bold text-xl my-10">
          Search Results {!loading && `(${filteredJobs.length})`}
          {searchedQuery && (
            <span className="text-gray-500 font-normal ml-2">
              for "{searchedQuery}"
            </span>
          )}
        </h1>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-[#ff7171]" />
          </div>
        ) : filteredJobs.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400">
            <Search className="h-12 w-12 mb-4" />
            <p className="text-lg font-medium">No jobs found</p>
            <p className="text-sm">Try adjusting your search terms</p>
          </div>
        ) : (
          /* Jobs Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredJobs.map((job) => (
              <Job key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
