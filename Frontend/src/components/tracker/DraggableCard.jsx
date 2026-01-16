import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Calendar, Building2, Briefcase, GripVertical } from "lucide-react";

const DraggableCard = ({ application }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: application._id,
    data: {
      application,
      status: application.status,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 shadow-sm cursor-grab active:cursor-grabbing transition-all duration-200 ${
        isDragging
          ? "opacity-50 shadow-lg scale-105 rotate-2"
          : "hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600"
      }`}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-start gap-2">
        <GripVertical className="h-4 w-4 text-gray-400 dark:text-gray-500 mt-0.5 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <Building2 className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
            <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100 truncate">
              {application.companyName}
            </h4>
          </div>
          <div className="flex items-center gap-1.5 mb-2">
            <Briefcase className="h-3 w-3 text-gray-400 dark:text-gray-500 flex-shrink-0" />
            <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
              {application.role}
            </p>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(application.appliedDate)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraggableCard;
