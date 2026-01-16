import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { TRACKER_API_ENDPOINT } from "@/utils/data";
import {
  setTrackedApplications,
  addTrackedApplication,
  updateTrackedApplication,
  removeTrackedApplication,
  setPagination,
  setLoading,
  setError,
} from "@/redux/slices/trackerSlice";

// Generate a temporary ID for optimistic updates
const generateTempId = () => `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

/**
 * Hook for fetching all tracked applications with pagination support
 */
export function useGetTrackedApplications() {
  const dispatch = useDispatch();

  const fetchApplications = useCallback(
    async (filters = {}, paginationOptions = {}) => {
      dispatch(setLoading(true));
      dispatch(setError(null));
      try {
        const params = new URLSearchParams();
        if (filters.status) params.append("status", filters.status);
        if (filters.search) params.append("search", filters.search);
        // Pagination params
        if (paginationOptions.page) params.append("page", paginationOptions.page);
        if (paginationOptions.limit) params.append("limit", paginationOptions.limit);

        const url = `${TRACKER_API_ENDPOINT}${params.toString() ? `?${params.toString()}` : ""}`;
        const res = await axios.get(url, { withCredentials: true });

        if (res.data.success) {
          dispatch(setTrackedApplications(res.data.data));
          // Update pagination state if provided in response
          if (res.data.pagination) {
            dispatch(setPagination(res.data.pagination));
          }
          return { data: res.data.data, pagination: res.data.pagination };
        }
      } catch (error) {
        const message = error.response?.data?.message || "Failed to fetch applications";
        dispatch(setError(message));
        toast.error(message);
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  return { fetchApplications };
}

/**
 * Hook for creating a new tracked application
 * Uses optimistic UI updates - adds to UI immediately, then confirms with API
 */
export function useCreateApplication() {
  const dispatch = useDispatch();
  const [loading, setLoadingState] = useState(false);

  const createApplication = useCallback(
    async (applicationData) => {
      setLoadingState(true);

      // Create optimistic application with temp ID
      const tempId = generateTempId();
      const optimisticApplication = {
        _id: tempId,
        ...applicationData,
        appliedDate: applicationData.appliedDate,
        status: applicationData.status || "Applied",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        _isOptimistic: true, // Flag for UI to show pending state
      };

      // Optimistically add to Redux immediately
      dispatch(addTrackedApplication(optimisticApplication));

      try {
        const res = await axios.post(TRACKER_API_ENDPOINT, applicationData, {
          withCredentials: true,
        });

        if (res.data.success) {
          // Replace optimistic entry with real data from server
          dispatch(removeTrackedApplication(tempId));
          dispatch(addTrackedApplication(res.data.data));
          toast.success("Application added successfully");
          return { success: true, data: res.data.data };
        }
      } catch (error) {
        // Rollback: remove the optimistic entry
        dispatch(removeTrackedApplication(tempId));
        const message = error.response?.data?.message || "Failed to add application";
        toast.error(message);
        return { success: false, error: message };
      } finally {
        setLoadingState(false);
      }
    },
    [dispatch]
  );

  return { createApplication, loading };
}

/**
 * Hook for updating a tracked application
 * Uses optimistic UI updates - updates UI immediately, then confirms with API
 */
export function useUpdateApplication() {
  const dispatch = useDispatch();
  const trackedApplications = useSelector((state) => state.tracker.trackedApplications);
  const [loading, setLoadingState] = useState(false);

  const updateApplication = useCallback(
    async (id, applicationData) => {
      setLoadingState(true);

      // Store previous state for rollback
      const previousApplication = trackedApplications.find((app) => app._id === id);

      // Optimistically update in Redux immediately
      const optimisticUpdate = {
        ...previousApplication,
        ...applicationData,
        updatedAt: new Date().toISOString(),
        _isOptimistic: true,
      };
      dispatch(updateTrackedApplication(optimisticUpdate));

      try {
        const res = await axios.put(`${TRACKER_API_ENDPOINT}/${id}`, applicationData, {
          withCredentials: true,
        });

        if (res.data.success) {
          // Replace with confirmed data from server
          dispatch(updateTrackedApplication(res.data.data));
          toast.success("Application updated successfully");
          return { success: true, data: res.data.data };
        }
      } catch (error) {
        // Rollback to previous state
        if (previousApplication) {
          dispatch(updateTrackedApplication(previousApplication));
        }
        const message = error.response?.data?.message || "Failed to update application";
        toast.error(message);
        return { success: false, error: message };
      } finally {
        setLoadingState(false);
      }
    },
    [dispatch, trackedApplications]
  );

  return { updateApplication, loading };
}

/**
 * Hook for deleting a tracked application
 * Uses optimistic UI updates - removes from UI immediately, then confirms with API
 */
export function useDeleteApplication() {
  const dispatch = useDispatch();
  const trackedApplications = useSelector((state) => state.tracker.trackedApplications);
  const [loading, setLoadingState] = useState(false);

  const deleteApplication = useCallback(
    async (id) => {
      setLoadingState(true);

      // Store the application for potential rollback
      const deletedApplication = trackedApplications.find((app) => app._id === id);

      // Optimistically remove from Redux immediately
      dispatch(removeTrackedApplication(id));

      try {
        const res = await axios.delete(`${TRACKER_API_ENDPOINT}/${id}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          toast.success("Application deleted successfully");
          return { success: true };
        }
      } catch (error) {
        // Rollback: restore the deleted application
        if (deletedApplication) {
          dispatch(addTrackedApplication(deletedApplication));
        }
        const message = error.response?.data?.message || "Failed to delete application";
        toast.error(message);
        return { success: false, error: message };
      } finally {
        setLoadingState(false);
      }
    },
    [dispatch, trackedApplications]
  );

  return { deleteApplication, loading };
}
