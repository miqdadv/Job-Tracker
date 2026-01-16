import { z } from "zod";
import TrackedApplication from "../models/trackedApplication.model.js";

// Zod validation schemas
const createApplicationSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  role: z.string().min(1, "Role is required"),
  status: z.enum(["Applied", "Interview", "Offer", "Rejected"]).optional(),
  appliedDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
});

const updateApplicationSchema = z.object({
  companyName: z.string().min(1, "Company name is required").optional(),
  role: z.string().min(1, "Role is required").optional(),
  status: z.enum(["Applied", "Interview", "Offer", "Rejected"]).optional(),
  appliedDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    })
    .optional(),
});

const filterSchema = z.object({
  status: z.enum(["Applied", "Interview", "Offer", "Rejected"]).optional(),
  search: z.string().optional(),
  page: z.string().transform((val) => parseInt(val, 10)).optional(),
  limit: z.string().transform((val) => parseInt(val, 10)).optional(),
});

// Create a new tracked application
export const createTrackedApplication = async (req, res) => {
  try {
    const userId = req.id;

    // Validate input
    const validationResult = createApplicationSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        message: validationResult.error.issues[0].message,
        success: false,
        errors: validationResult.error.issues,
      });
    }

    const { companyName, role, status, appliedDate } = validationResult.data;

    const newApplication = await TrackedApplication.create({
      companyName,
      role,
      status: status || "Applied",
      appliedDate: new Date(appliedDate),
      userId,
    });

    return res.status(201).json({
      message: "Application tracked successfully",
      success: true,
      data: newApplication,
    });
  } catch (error) {
    console.error("Error creating tracked application:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// Get all tracked applications for a user with optional filters and pagination
export const getTrackedApplications = async (req, res) => {
  try {
    const userId = req.id;

    // Validate query params
    const validationResult = filterSchema.safeParse(req.query);
    if (!validationResult.success) {
      return res.status(400).json({
        message: validationResult.error.issues[0].message,
        success: false,
        errors: validationResult.error.issues,
      });
    }

    const { status, search, page = 1, limit = 10 } = validationResult.data;

    // Build query
    const query = { userId };

    // Filter by status if provided
    if (status) {
      query.status = status;
    }

    // Search by company name or role if provided
    if (search) {
      query.$or = [
        { companyName: { $regex: search, $options: "i" } },
        { role: { $regex: search, $options: "i" } },
      ];
    }

    // Get total count for pagination
    const total = await TrackedApplication.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    // Apply pagination
    const skip = (page - 1) * limit;
    const applications = await TrackedApplication.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      success: true,
      data: applications,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Error fetching tracked applications:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// Get a single tracked application by ID
export const getTrackedApplicationById = async (req, res) => {
  try {
    const userId = req.id;
    const applicationId = req.params.id;

    const application = await TrackedApplication.findOne({
      _id: applicationId,
      userId,
    });

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error) {
    console.error("Error fetching tracked application:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// Update a tracked application
export const updateTrackedApplication = async (req, res) => {
  try {
    const userId = req.id;
    const applicationId = req.params.id;

    // Validate input
    const validationResult = updateApplicationSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        message: validationResult.error.issues[0].message,
        success: false,
        errors: validationResult.error.issues,
      });
    }

    const application = await TrackedApplication.findOne({
      _id: applicationId,
      userId,
    });

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
        success: false,
      });
    }

    const { companyName, role, status, appliedDate } = validationResult.data;

    // Update fields if provided
    if (companyName) application.companyName = companyName;
    if (role) application.role = role;
    if (status) application.status = status;
    if (appliedDate) application.appliedDate = new Date(appliedDate);

    await application.save();

    return res.status(200).json({
      message: "Application updated successfully",
      success: true,
      data: application,
    });
  } catch (error) {
    console.error("Error updating tracked application:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// Delete a tracked application
export const deleteTrackedApplication = async (req, res) => {
  try {
    const userId = req.id;
    const applicationId = req.params.id;

    const application = await TrackedApplication.findOneAndDelete({
      _id: applicationId,
      userId,
    });

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Application deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error deleting tracked application:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
