import React from "react";
import Job from "./Job";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);
  return (
    <div className="max-w-7xl mx-auto my-20">
      <h2 className="text-4xl font-semibold text-center">
        <span className="text-[#ff7171]">Latest</span> Job Openings
      </h2>
      {/* Job Cards */}
      <div className="grid grid-cols-3 gap-4 my-5 mt-12">
        {allJobs.length <= 0 ? (
          <span></span>
        ) : (
          allJobs.slice(0, 6).map((job) => <Job key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
