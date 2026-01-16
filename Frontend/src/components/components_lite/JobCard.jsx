import React from "react";
import { Badge } from "../ui/badge";
import { motion } from "motion/react";
const JobCard = ({ job }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.03,
        y: -6,
        boxShadow: "0px 20px 30px rgba(255, 113, 113, 0.35)",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className="p-5 rounded-md shadow-lg cursor-pointer border border-gray-100"
    >
      <div>
        <h1 className="text-lg font-medium">{job?.company?.name}</h1>
        <p className="text-sm text-gray-600">{job?.location}</p>
      </div>
      <div>
        <h2 className="font-bold text-lg my-2">{job?.title}</h2>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex gap-2 items-center mt-4">
        <Badge variant="secondary" className="font-bold text-blue-400">
          {job?.position} Openings
        </Badge>
        <Badge variant="secondary" className="font-bold text-red-400">
          {job?.salary} LPA
        </Badge>
        <Badge variant="secondary" className="font-bold text-orange-400">
          {job?.location}
        </Badge>
        <Badge variant="secondary" className="font-bold text-yellow-400">
          {job?.jobType}
        </Badge>
      </div>
    </motion.div>
  );
};

export default JobCard;
