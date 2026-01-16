import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { X } from "lucide-react";
import axios from "axios";
import { JOB_API_ENDPOINT, COMPANY_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";

const PostJobForm = ({ onSuccess, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "Full time",
    experience: "",
    position: "",
    companyId: "",
  });

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get(`${COMPANY_API_ENDPOINT}/get`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setCompanies(response.data.companies);
        if (response.data.companies.length > 0) {
          setFormData((prev) => ({
            ...prev,
            companyId: response.data.companies[0]._id,
          }));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.companyId) {
      toast.error("Please select or create a company first");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${JOB_API_ENDPOINT}/post`, formData, {
        withCredentials: true,
      });
      if (response.data.status) {
        toast.success("Job posted successfully!");
        onSuccess();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Post a New Job
        </h2>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      {companies.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            You need to register a company before posting a job.
          </p>
          <RegisterCompanyForm onSuccess={fetchCompanies} />
        </div>
      ) : (
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
              <Label htmlFor="companyId">Company *</Label>
              <select
                id="companyId"
                name="companyId"
                value={formData.companyId}
                onChange={handleChange}
                required
                className="mt-1 w-full h-10 px-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                {companies.map((company) => (
                  <option key={company._id} value={company._id}>
                    {company.name}
                  </option>
                ))}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-[#ff7171] hover:bg-[#ff5555] text-white"
            >
              {loading ? "Posting..." : "Post Job"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

const RegisterCompanyForm = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [companyData, setCompanyData] = useState({
    companyName: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `${COMPANY_API_ENDPOINT}/register`,
        companyData,
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success("Company registered successfully!");
        onSuccess();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to register company");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <Label htmlFor="companyName">Company Name *</Label>
        <Input
          id="companyName"
          name="companyName"
          value={companyData.companyName}
          onChange={handleChange}
          placeholder="e.g. Tech Corp"
          required
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="description">Company Description *</Label>
        <textarea
          id="description"
          name="description"
          value={companyData.description}
          onChange={handleChange}
          placeholder="Brief description of your company..."
          required
          rows={3}
          className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none"
        />
      </div>
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-[#ff7171] hover:bg-[#ff5555] text-white"
      >
        {loading ? "Registering..." : "Register Company"}
      </Button>
    </form>
  );
};

export default PostJobForm;
