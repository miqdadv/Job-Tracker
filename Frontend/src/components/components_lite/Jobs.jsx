import React, { useEffect } from "react";
import Navbar from "./Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector, useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/slices/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { X } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const Jobs = () => {
  const dispatch = useDispatch();
  const { allJobs, searchedQuery } = useSelector((store) => store.job);

  useGetAllJobs();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);

  const handleClearFilter = () => {
    dispatch(setSearchedQuery(""));
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        {searchedQuery && (
          <div className="flex items-center gap-2 px-6 mb-4">
            <span className="text-gray-600">Filtering by:</span>
            <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1">
              {searchedQuery}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                onClick={handleClearFilter}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          </div>
        )}
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>
          {allJobs.length === 0 ? (
            <span className="px-6">No Job Found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4 px-6 py-6">
                {allJobs.map((job) => (
                  <Job key={job._id} job={job} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
