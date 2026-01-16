import { setTrackedApplications, setLoading, setError, setPagination } from "@/redux/slices/trackerSlice";
import { TRACKER_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function useGetTrackedApplications() {
  const dispatch = useDispatch();
  const { filters, pagination } = useSelector((store) => store.tracker);

  useEffect(() => {
    const fetchTrackedApplications = async () => {
      dispatch(setLoading(true));
      dispatch(setError(null));

      try {
        const params = new URLSearchParams();
        if (filters.status) params.append("status", filters.status);
        if (filters.search) params.append("search", filters.search);
        params.append("page", pagination.page.toString());
        params.append("limit", pagination.limit.toString());

        const queryString = params.toString();
        const url = `${TRACKER_API_ENDPOINT}?${queryString}`;

        const res = await axios.get(url, { withCredentials: true });

        if (res.data.success) {
          dispatch(setTrackedApplications(res.data.data));
          if (res.data.pagination) {
            dispatch(setPagination(res.data.pagination));
          }
        } else {
          dispatch(setError(res.data.message || "Failed to fetch applications"));
        }
      } catch (error) {
        console.error("Error fetching tracked applications:", error);
        dispatch(setError(error.response?.data?.message || "Failed to fetch applications"));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchTrackedApplications();
  }, [filters.status, filters.search, pagination.page, pagination.limit, dispatch]);
}

export default useGetTrackedApplications;
