import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";

const EditJobModal = ({ job, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: job.title || "",
    description: job.description || "",
    requirements: Array.isArray(job.requirements)
      ? job.requirements.join(", ")
      : job.requirements || "",
    salary: job.salary || "",
    location: job.location || "",
    jobType: job.jobType || "Full time",
    experience: job.experience || "",
    position: job.position || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.put(
        `${JOB_API_ENDPOINT}/update/${job._id}`,
        formData,
        { withCredentials: true }
      );
      if (response.data.status) {
        toast.success("Job updated successfully!");
        onSuccess();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to update job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Job</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Backend Developer"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="jobType">Job Type *</Label>
              <select
                id="jobType"
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                required
                className="mt-1 w-full h-10 px-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="Full time">Full time</option>
                <option value="Part time">Part time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the role and responsibilities..."
              required
              rows={4}
              className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none"
            />
          </div>

          <div>
            <Label htmlFor="requirements">Requirements *</Label>
            <Input
              id="requirements"
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              placeholder="e.g. Node.js, PostgreSQL, REST APIs (comma separated)"
              required
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">Separate with commas</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="salary">Salary (LPA) *</Label>
              <Input
                id="salary"
                name="salary"
                type="number"
                value={formData.salary}
                onChange={handleChange}
                placeholder="e.g. 16"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Bangalore"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="experience">Experience (years) *</Label>
              <Input
                id="experience"
                name="experience"
                type="number"
                value={formData.experience}
                onChange={handleChange}
                placeholder="e.g. 3"
                required
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="position">Number of Positions *</Label>
            <Input
              id="position"
              name="position"
              type="number"
              value={formData.position}
              onChange={handleChange}
              placeholder="e.g. 2"
              required
              className="mt-1"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-[#ff7171] hover:bg-[#ff5555] text-white"
            >
              {loading ? "Updating..." : "Update Job"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditJobModal;
