import React from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "motion/react";
import ApplicationCard from "./ApplicationCard";
import { FileX, Loader2, AlertCircle } from "lucide-react";

const ApplicationList = () => {
  const { trackedApplications, filters, loading, error } = useSelector(
    (store) => store.tracker
  );

  const filteredApplications = trackedApplications.filter((app) => {
    const matchesStatus = !filters.status || app.status === filters.status;
    const matchesSearch =
      !filters.search ||
      app.companyName.toLowerCase().includes(filters.search.toLowerCase()) ||
      app.role.toLowerCase().includes(filters.search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-16"
      >
        <Loader2 className="h-12 w-12 text-gray-400 dark:text-gray-500 animate-spin mb-4" />
        <p className="text-gray-500 dark:text-gray-400 text-lg">Loading applications...</p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-16"
      >
        <AlertCircle className="h-12 w-12 text-red-400 mb-4" />
        <p className="text-red-500 dark:text-red-400 text-lg font-medium">
          Error loading applications
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">{error}</p>
      </motion.div>
    );
  }

  if (filteredApplications.length === 0) {
    const hasFilters = filters.status || filters.search;
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center justify-center py-16"
      >
        <FileX className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
        <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
          {hasFilters ? "No matching applications" : "No applications yet"}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
          {hasFilters
            ? "Try adjusting your filters to see more results."
            : "Start tracking your job applications by clicking the \"Add Application\" button above."}
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <AnimatePresence mode="popLayout">
        {filteredApplications.map((application, index) => (
          <ApplicationCard
            key={application._id}
            application={application}
            index={index}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ApplicationList;
