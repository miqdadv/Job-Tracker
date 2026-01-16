import React from "react";
import { Button } from "../ui/button";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { motion } from "motion/react";
import { Badge } from "../ui/badge";
import { useSelector, useDispatch } from "react-redux";
import { toggleBookmark } from "@/redux/slices/bookmarkSlice";
import JobDetailsPopover from "./JobDetailsPopover";

const Job = ({ job }) => {
  const dispatch = useDispatch();
  const { bookmarkedJobs } = useSelector((store) => store.bookmark);
  const isBookmarked = bookmarkedJobs.some((j) => j._id === job._id);

  const daysAgo = (mongoTime) => {
    if (!mongoTime) return "Recently";
    const createdAt = new Date(mongoTime);
    if (isNaN(createdAt.getTime())) return "Recently";
    const now = new Date();
    const diffTime = now - createdAt;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day ago";
    return `${diffDays} days ago`;
  };

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
      className="p-5 rounded-lg shadow-md border border-gray-100 cursor-pointer overflow-hidden bg-white"
    >
      {/* Top */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">{daysAgo(job?.createdAt)}</p>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={() => dispatch(toggleBookmark(job))}
        >
          {isBookmarked ? (
            <BookmarkCheck size={16} className="text-[#ff7171] fill-[#ff7171]" />
          ) : (
            <Bookmark size={16} />
          )}
        </Button>
      </div>

      {/* Middle */}
      <div className="flex gap-4">
        <Avatar className="h-14 w-14">
          <AvatarImage src={job?.company?.logo} />
        </Avatar>

        <div className="flex-1">
          <h1 className="text-lg font-semibold">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">{job?.location}</p>

          <h2 className="font-bold text-lg mt-2">{job?.title}</h2>
          <p className="text-sm text-gray-600 mt-1">{job?.description}</p>
        </div>
      </div>

      {/* Bottom: Badges */}
      <div className="flex flex-wrap gap-2 mt-4">
        <Badge variant="secondary" className="font-semibold text-blue-500">
          {job?.position} Openings
        </Badge>
        <Badge variant="secondary" className="font-semibold text-red-500">
          {job?.salary} LPA
        </Badge>
        <Badge variant="secondary" className="font-semibold text-orange-500">
          {job?.location}
        </Badge>
        <Badge variant="secondary" className="font-semibold text-yellow-500">
          {job?.jobType}
        </Badge>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 mt-5">
        <JobDetailsPopover job={job}>
          <Button className="bg-[#ff7171] hover:bg-[#ff5c5c] text-white">
            View Details
          </Button>
        </JobDetailsPopover>
      </div>
    </motion.div>
  );
};

export default Job;
