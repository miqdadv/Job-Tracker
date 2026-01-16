import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/data.js";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/slices/authSlice";
import { Spinner } from "../ui/spinner";

const Register = () => {
  const USE_FAKE_API = false;
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
    phoneNumber: "",
    file: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // ---------Fake API calling
    // if (USE_FAKE_API) {
    //   setTimeout(() => {
    //     if (
    //       !input.fullName ||
    //       !input.email ||
    //       !input.password ||
    //       !input.role ||
    //       !input.phoneNumber ||
    //       !input.file
    //     ) {
    //       toast.error("All fields are required");
    //       dispatch(setLoading(false));
    //       return;
    //     }
    //     dispatch(setLoading(false));
    //     toast.success("Account created successfully");
    //     navigate("/login");
    //   }, 6000);
    //   return;
    // }

    // ---------Real API calling----------
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("role", input.role);
    formData.append("phoneNumber", input.phoneNumber);
    if (input.file) {
      formData.append("file", input.file);//to be addressed
    }
    // Form data ready, now send to backend
    console.log("FormData contents:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    try {
      dispatch(setLoading(true));
      const { file, ...userData } = input;
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, userData, {
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("Error during registration:", error);
      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 rounded-lg p-5 my-10 shadow-2xl"
        >
          <h1 className="font-bold text-2xl mb-5 text-center underline">
            Create Account
          </h1>
          <div className="my-2">
            <Label className="mb-2">Username</Label>
            <Input
              type="text"
              value={input.fullName}
              name="fullName"
              onChange={changeEventHandler}
              placeholder="Username"
            ></Input>
          </div>

          <div className="my-2">
            <Label className="mb-2">Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="example@gmail.com"
            ></Input>
          </div>

          <div className="my-2">
            <Label className="mb-2">Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="*******"
            ></Input>
          </div>

          <div className="my-2">
            <Label className="mb-2">Contact Number</Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="0123456789"
            ></Input>
          </div>

          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center gap-3">
                <Input
                  type="radio"
                  name="role"
                  value="Student"
                  checked={input.role === "Student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center gap-3">
                <Input
                  type="radio"
                  name="role"
                  value="Recruiter"
                  checked={input.role === "Recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex items-center gap-2">
            <Label>Profile Pic</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={changeFileHandler}
              className="cursor-pointer"
            />
          </div>
          <Button
            type="submit"
            className="w-full mt-8 bg-[#007BFF] hover:bg-blue-400 cursor-pointer text-md py-3 text-white"
          >
            {loading ? <Spinner/> :"Sign Up"}
          </Button>

          {/* Already having an account */}
          <p className="text-gray-500 text-sm my-2">
            Already have an account?{" "}
            <Link to={"/login"} className="text-blue-400 font-medium">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
