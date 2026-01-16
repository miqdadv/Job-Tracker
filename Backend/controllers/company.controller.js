import Company from "../models/company.model.js";

// Register a new company
export const registerCompany = async (req, res) => {
  try {
    const { companyName, description } = req.body;
    if (!companyName) {
      return res
        .status(400)
        .json({ message: "Company Name is required", success: false });
    }
    if (!description) {
      return res
        .status(400)
        .json({ message: "Company Description is required", success: false });
    }
    let company = await Company.findOne({ name: companyName });

    // Check if company already exists
    if (company) {
      return res
        .status(401)
        .json({ message: "Company already exists", success: false });
    }

    company = await Company.create({
      name: companyName,
      description,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Company registered successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

// Get all companies for a user
export const getAllCompanies = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });
    if (!companies) {
      return res
        .status(404)
        .json({ message: "No companies found", success: false });
    }
    return res.status(200).json({message:"Companies fetched successfully",companies,success:true});
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

// Get company by ID
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res
        .status(404)
        .json({ message: "Company not found", success: false });
    }
    return res.status(200).json({
      message: "Company fetched successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;
    // cloudinary logic to upload image
    const updateData = { name, description, website, location };
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!company) {
      return res.status(404).json({ message: "Company not found", success: false });
    }
    return res.status(200).json({
      message: "Company updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};
