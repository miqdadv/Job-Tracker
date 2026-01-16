import React, { useMemo } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useSelector, useDispatch } from "react-redux";
import { updateTrackedApplication } from "@/redux/slices/trackerSlice";
import { useUpdateApplication } from "@/hooks/useTrackerApi";
import StatusColumn from "./StatusColumn";
import DraggableCard from "./DraggableCard";
import { Loader2, AlertCircle, FileX } from "lucide-react";

const STATUSES = ["Applied", "Interview", "Offer", "Rejected"];

const KanbanBoard = () => {
  const dispatch = useDispatch();
  const { trackedApplications, filters, loading, error } = useSelector(
    (store) => store.tracker
  );
  const { updateApplication } = useUpdateApplication();
  const [activeId, setActiveId] = React.useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const filteredApplications = useMemo(() => {
    return trackedApplications.filter((app) => {
      const matchesSearch =
        !filters.search ||
        app.companyName.toLowerCase().includes(filters.search.toLowerCase()) ||
        app.role.toLowerCase().includes(filters.search.toLowerCase());
      return matchesSearch;
    });
  }, [trackedApplications, filters.search]);

  const applicationsByStatus = useMemo(() => {
    const grouped = {};
    STATUSES.forEach((status) => {
      grouped[status] = filteredApplications.filter(
        (app) => app.status === status
      );
    });
    return grouped;
  }, [filteredApplications]);

  const activeApplication = useMemo(() => {
    if (!activeId) return null;
    return trackedApplications.find((app) => app._id === activeId);
  }, [activeId, trackedApplications]);

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const applicationId = active.id;
    const application = trackedApplications.find(
      (app) => app._id === applicationId
    );

    if (!application) return;

    const newStatus = over.id;

    if (
      !STATUSES.includes(newStatus) ||
      application.status === newStatus
    ) {
      return;
    }

    dispatch(
      updateTrackedApplication({
        ...application,
        status: newStatus,
      })
    );

    const result = await updateApplication(applicationId, { status: newStatus });

    if (!result?.success) {
      dispatch(updateTrackedApplication(application));
    }
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="h-12 w-12 text-gray-400 dark:text-gray-500 animate-spin mb-4" />
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Loading applications...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <AlertCircle className="h-12 w-12 text-red-400 mb-4" />
        <p className="text-red-500 dark:text-red-400 text-lg font-medium">
          Error loading applications
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">{error}</p>
      </div>
    );
  }

  if (trackedApplications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <FileX className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
        <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
          No applications yet
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
          Start tracking your job applications by clicking the "Add Application"
          button above.
        </p>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATUSES.map((status) => (
          <StatusColumn
            key={status}
            status={status}
            applications={applicationsByStatus[status]}
          />
        ))}
      </div>
      <DragOverlay>
        {activeApplication ? (
          <div className="rotate-3 scale-105">
            <DraggableCard application={activeApplication} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default KanbanBoard;
