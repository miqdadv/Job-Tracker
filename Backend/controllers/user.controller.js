import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  try {
    console.log("Headers:", req.headers["content-type"]);
    console.log("Body:", req.body);
    const { fullName, email, phoneNumber, password, role } = req.body;
    if (!fullName || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    const user = await User.findOne({ email }); // Check if user already exists
    if (user) {
      return res.status(400).json({
        message: "Email already in use",
        success: false,
      });
    }
    // Converting user password to hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating a new user
    const newUser = new User({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    return res.status(201).json({
      message: "User registered successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        message: `${field === 'email' ? 'Email' : 'Phone number'} already in use`,
        success: false,
      });
    }
    res.status(500).json({
      message: "Internal Server Error Register",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Email, password, and role are required",
        success: false,
      });
    }
    
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Invalid email or password",
        success: false,
      });
    }

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({
        message: "Invalid password",
        success: false,
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log("Hostname:", req.hostname);

    // Set cookie with secure attributes
    const isLocalhost = req.hostname === 'localhost';
    res.cookie("token", token, {
      httpOnly: true,
      secure: !isLocalhost, // Only use secure in production (HTTPS)
      sameSite: isLocalhost ? "lax" : "none", // Use lax for localhost, none for cross-site
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      path: "/",
    });

    // Remove password from response
    user = user.toObject();
    delete user.password;

    return res.status(200).json({
      message: "Login successful",
      success: true,
      user,
      token,
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Internal server error during login",
      success: false,
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error Logout",
      success: false,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, bio, skills } = req.body;
    // if ((!fullName || !email || !phoneNumber, !bio || !skills)) {
    //   return res.status(400).json({
    //     message: "All fields are required",
    //     success: false,
    //   });
    // }
    let skillsArray = [];
    if(skills && skills.trim() !== ''){
      skillsArray = skills.split(",");
    }
    // Only authenticated users can update their profile.
    const userId = req.id; // From middleware authentication
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    //Updating user profile
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;
    await user.save();

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error Update Profile",
      success: false,
    });
  }
};
