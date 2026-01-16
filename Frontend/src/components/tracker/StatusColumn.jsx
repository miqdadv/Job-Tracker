import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import DraggableCard from "./DraggableCard";

const statusColors = {
  Applied: {
    bg: "bg-blue-50 dark:bg-blue-950",
    border: "border-blue-200 dark:border-blue-800",
    header: "bg-blue-100 dark:bg-blue-900",
    text: "text-blue-800 dark:text-blue-200",
    count: "bg-blue-200 dark:bg-blue-800 text-blue-900 dark:text-blue-100",
  },
  Interview: {
    bg: "bg-yellow-50 dark:bg-yellow-950",
    border: "border-yellow-200 dark:border-yellow-800",
    header: "bg-yellow-100 dark:bg-yellow-900",
    text: "text-yellow-800 dark:text-yellow-200",
    count: "bg-yellow-200 dark:bg-yellow-800 text-yellow-900 dark:text-yellow-100",
  },
  Offer: {
    bg: "bg-green-50 dark:bg-green-950",
    border: "border-green-200 dark:border-green-800",
    header: "bg-green-100 dark:bg-green-900",
    text: "text-green-800 dark:text-green-200",
    count: "bg-green-200 dark:bg-green-800 text-green-900 dark:text-green-100",
  },
  Rejected: {
    bg: "bg-red-50 dark:bg-red-950",
    border: "border-red-200 dark:border-red-800",
    header: "bg-red-100 dark:bg-red-900",
    text: "text-red-800 dark:text-red-200",
    count: "bg-red-200 dark:bg-red-800 text-red-900 dark:text-red-100",
  },
};

const StatusColumn = ({ status, applications }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  const colors = statusColors[status] || statusColors.Applied;
  const applicationIds = applications.map((app) => app._id);

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col rounded-lg border-2 ${colors.border} ${colors.bg} min-h-[400px] transition-all duration-200 ${
        isOver ? "ring-2 ring-offset-2 ring-blue-500 scale-[1.02]" : ""
      }`}
    >
      <div className={`${colors.header} px-4 py-3 rounded-t-md`}>
        <div className="flex items-center justify-between">
          <h3 className={`font-semibold ${colors.text}`}>{status}</h3>
          <span
            className={`${colors.count} text-xs font-bold px-2 py-1 rounded-full`}
          >
            {applications.length}
          </span>
        </div>
      </div>
      <div className="flex-1 p-3 space-y-3 overflow-y-auto">
        <SortableContext
          items={applicationIds}
          strategy={verticalListSortingStrategy}
        >
          {applications.length === 0 ? (
            <div className="flex items-center justify-center h-24 text-gray-400 dark:text-gray-500 text-sm">
              Drop applications here
            </div>
          ) : (
            applications.map((application) => (
              <DraggableCard key={application._id} application={application} />
            ))
          )}
        </SortableContext>
      </div>
    </div>
  );
};

export default StatusColumn;
