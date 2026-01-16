import { setAllJobs, setJobLoading } from "@/redux/slices/jobSlice";
import { JOB_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function useGetAllJobs() {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchAllJobs = async () => {
      dispatch(setJobLoading(true));
      try {
        const res = await axios.get(
          `${JOB_API_ENDPOINT}/get${searchedQuery ? `?keyword=${encodeURIComponent(searchedQuery)}` : ""}`,
          { withCredentials: true }
        );
        if (res.data.status) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        dispatch(setJobLoading(false));
      }
    };
    fetchAllJobs();
  }, [searchedQuery, dispatch]);
}

export default useGetAllJobs;
