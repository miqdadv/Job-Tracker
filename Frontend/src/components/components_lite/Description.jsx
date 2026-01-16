import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const Description = () => {
  const isApplied = false;
  return (
    <div>
      <div className="max-w-7xl mx-auto my-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-xl">Title</h1>
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge
                variant="secondary"
                className="font-medium text-blue-500 text-md"
              >
                10 Openings
              </Badge>
              <Badge variant="secondary" className="font-medium text-red-500 text-md">
                20 LPA
              </Badge>
              <Badge
                variant="secondary"
                className="font-medium text-orange-500 text-md"
              >
                Remote
              </Badge>
              <Badge
                variant="secondary"
                className="font-medium text-yellow-500 text-md"
              >
                Full time
              </Badge>
            </div>
          </div>

          <div>
            <Button
              disabled={isApplied}
              className={`cursor-pointer shadow-2xl  ${
                isApplied ? "bg-gray-600" : "bg-[#ff7171] hover:bg-[#ff9a9a]"
              }`}
            >
              {isApplied ? "Already Applied" : "Apply"}
            </Button>
          </div>
        </div>
        <h1 className="border-b-2 border-b-gray-400 font-medium py-4">
          Job Description
        </h1>
        <div className="my-4">
          <h1 className="font-bold my-1 ">
            Role: <span className="pl-4 font-normal text-gray-800">SDE</span>
          </h1>
          <h1 className="font-bold my-1 ">
            Location:{" "}
            <span className="pl-4 font-normal text-gray-800">Remote</span>
          </h1>
          <h1 className="font-bold my-1 ">
            Salary:{" "}
            <span className="pl-4 font-normal text-gray-800">12LPA</span>
          </h1>
          <h1 className="font-bold my-1 ">
            Experience:{" "}
            <span className="pl-4 font-normal text-gray-800">Fresher</span>
          </h1>
          <h1 className="font-bold my-1 ">
            Job Type:{" "}
            <span className="pl-4 font-normal text-gray-800">Internship</span>
          </h1>
          <h1 className="font-bold my-1 ">
            Total Applicants: <span className="pl-4 font-normal text-gray-800">10</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Description;
