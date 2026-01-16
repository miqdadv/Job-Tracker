import React, { useState, useEffect } from "react";
import Navbar from "../components_lite/Navbar";
import { Button } from "../ui/button";
import { Plus, Briefcase } from "lucide-react";
import PostJobForm from "./PostJobForm";
import RecruiterJobCard from "./RecruiterJobCard";
import EditJobModal from "./EditJobModal";
import ApplicantsModal from "./ApplicantsModal";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";

const RecruiterDashboard = () => {
  const [showPostForm, setShowPostForm] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingJob, setEditingJob] = useState(null);
  const [viewingApplicantsJob, setViewingApplicantsJob] = useState(null);

  const fetchRecruiterJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${JOB_API_ENDPOINT}/getAdminJobs`, {
        withCredentials: true,
      });
      if (response.data.status) {
        setJobs(response.data.jobs);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecruiterJobs();
  }, []);

  const handleJobPosted = () => {
    setShowPostForm(false);
    fetchRecruiterJobs();
  };

  const handleDeleteJob = async (jobId) => {
    try {
      const response = await axios.delete(`${JOB_API_ENDPOINT}/delete/${jobId}`, {
        withCredentials: true,
      });
      if (response.data.status) {
        toast.success("Job deleted successfully");
        fetchRecruiterJobs();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to delete job");
    }
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
  };

  const handleJobUpdated = () => {
    setEditingJob(null);
    fetchRecruiterJobs();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Recruiter Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage your job postings
            </p>
          </div>
          <Button
            onClick={() => setShowPostForm(true)}
            className="bg-[#ff7171] hover:bg-[#ff5555] text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Post New Job
          </Button>
        </div>

        {showPostForm && (
          <div className="mb-8">
            <PostJobForm
              onSuccess={handleJobPosted}
              onCancel={() => setShowPostForm(false)}
            />
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner className="w-8 h-8" />
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow">
            <Briefcase className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No Jobs Posted Yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Start by posting your first job opening
            </p>
            <Button
              onClick={() => setShowPostForm(true)}
              className="bg-[#ff7171] hover:bg-[#ff5555] text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Post Your First Job
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <RecruiterJobCard
                key={job._id}
                job={job}
                onEdit={() => handleEditJob(job)}
                onDelete={() => handleDeleteJob(job._id)}
                onViewApplicants={() => setViewingApplicantsJob(job)}
              />
            ))}
          </div>
        )}

        {editingJob && (
          <EditJobModal
            job={editingJob}
            onClose={() => setEditingJob(null)}
            onSuccess={handleJobUpdated}
          />
        )}

        {viewingApplicantsJob && (
          <ApplicantsModal
            job={viewingApplicantsJob}
            onClose={() => setViewingApplicantsJob(null)}
          />
        )}
      </div>
    </div>
  );
};

export default RecruiterDashboard;
