import React from "react";
import { Badge } from "../ui/badge";

const statusConfig = {
  Applied: {
    className: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-800",
  },
  Interview: {
    className: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-800",
  },
  Offer: {
    className: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-800",
  },
  Rejected: {
    className: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-800",
  },
};

const StatusBadge = ({ status }) => {
  const config = statusConfig[status] || statusConfig.Applied;

  return (
    <Badge variant="outline" className={config.className}>
      {status}
    </Badge>
  );
};

export default StatusBadge;
