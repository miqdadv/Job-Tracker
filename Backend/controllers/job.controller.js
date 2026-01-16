import Job from "../models/job.model.js";

//For admin
export const postJob = async (req, res) => {
  // Logic to post a new job
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      position,
      companyId,
      experience,
    } = req.body;
    const userId = req.id;
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !position ||
      !companyId ||
      !experience
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required", status: false });
    }
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      position,
      company: companyId,
      experience: Number(experience),
      created_by: userId,
    });
    return res.status(201).json({
      message: "Job posted successfully",
      job,
      status: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error Post Job", status: false });
  }
};

export const getAllJobs = async (req, res) => {
  // Logic to get all jobs
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { location: { $regex: keyword, $options: "i" } },
        { jobType: { $regex: keyword, $options: "i" } },
        { position: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query).populate({
        path: "company",
    }).sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({ message: "No jobs found", status: false });
    }
    return res.status(200).json({ jobs, status: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error Get Jobs", status: false });
  }
};

//For users to get a job by ID
export const getJobById = async (req, res) => {
  // Logic to get a job by ID
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found", status: false });
    }
    return res.status(200).json({ job, status: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error Get Job By ID", status: false });
  }
};

//Admin job created

export const getAdminJobs = async (req, res) => {
  // Logic to get jobs created by admin
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "company",
    }).sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({ message: "No jobs found", status: false });
    }
    return res.status(200).json({ jobs, status: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error Get Admin Jobs", status: false });
  }
};

// Update a job
export const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.id;
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      position,
      experience,
    } = req.body;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found", status: false });
    }

    // Check if the user is the creator of the job
    if (job.created_by.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this job", status: false });
    }

    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (requirements) updateData.requirements = requirements.split(",");
    if (salary) updateData.salary = salary;
    if (location) updateData.location = location;
    if (jobType) updateData.jobType = jobType;
    if (position) updateData.position = position;
    if (experience) updateData.experience = Number(experience);

    const updatedJob = await Job.findByIdAndUpdate(jobId, updateData, {
      new: true,
    }).populate("company");

    return res.status(200).json({
      message: "Job updated successfully",
      job: updatedJob,
      status: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error Update Job", status: false });
  }
};

// Delete a job
export const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.id;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found", status: false });
    }

    // Check if the user is the creator of the job
    if (job.created_by.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this job", status: false });
    }

    await Job.findByIdAndDelete(jobId);

    return res.status(200).json({
      message: "Job deleted successfully",
      status: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error Delete Job", status: false });
  }
};
