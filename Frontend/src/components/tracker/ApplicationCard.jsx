import React from "react";
import { motion } from "motion/react";
import StatusBadge from "./StatusBadge";
import { Calendar, Building2, Briefcase, Loader2 } from "lucide-react";

const ApplicationCard = ({ application, onEdit, onDelete, index = 0 }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const isOptimistic = application?._isOptimistic;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isOptimistic ? 0.7 : 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
        ease: "easeOut",
      }}
      whileHover={{
        scale: isOptimistic ? 1 : 1.02,
        y: isOptimistic ? 0 : -4,
        boxShadow: isOptimistic ? "none" : "0px 12px 24px rgba(0, 0, 0, 0.1)",
      }}
      layout
      className={`p-5 rounded-lg shadow-md cursor-pointer border bg-white dark:bg-gray-800 ${
        isOptimistic
          ? "border-dashed border-gray-300 dark:border-gray-600"
          : "border-gray-100 dark:border-gray-700"
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          {isOptimistic ? (
            <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
          ) : (
            <Building2 className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          )}
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {application?.companyName}
          </h2>
        </div>
        <StatusBadge status={application?.status} />
      </div>

      <div className="flex items-center gap-2 mb-3">
        <Briefcase className="h-4 w-4 text-gray-400 dark:text-gray-500" />
        <p className="text-md text-gray-700 dark:text-gray-300">{application?.role}</p>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <Calendar className="h-4 w-4" />
        <span>Applied: {formatDate(application?.appliedDate)}</span>
      </div>
    </motion.div>
  );
};

export default ApplicationCard;
