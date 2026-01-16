import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_ENDPOINT } from "@/utils/data.js";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/slices/authSlice";
import store from "@/redux/store";
import { Spinner } from "../ui/spinner";

const Login = () => {
  const USE_FAKE_API = false; //set to false to use real API
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    // console.log("Triggered", input);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // // ----------Fake API calling----------
    // dispatch(setLoading(true));
    // if (USE_FAKE_API) {
    //   setTimeout(() => {
    //     // basic validation (optional)
    //     if (!input.email || !input.password || !input.role) {
    //       toast.error("All fields are required");
    //       return;
    //     }
    //     dispatch(setLoading(false));
    //     // fake success response
    //     toast.success(`Welcome back, ${input.role}`);
    //     navigate("/");
    //   }, 6000); // simulate network delay

    //   return; // stop real API call
    // }

    //-------Real API call below-------
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        if (res.data.user.role === "Recruiter") {
          navigate("/recruiter/dashboard");
        } else {
          navigate("/");
        }
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("Error during Login:", error);
      toast.error(error.response?.data?.message || "Login failed");
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
            Login
          </h1>
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

          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4">
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
          <Button
            type="submit"
            className="w-full mt-8 bg-[#007BFF] hover:bg-blue-400 cursor-pointer text-md py-3 text-white"
          >
            {loading ? <Spinner /> : "Login"}
          </Button>

          {/* Not having an account */}
          <p className="text-gray-500 text-sm my-2">
            Don't have an account?{" "}
            <Link to={"/register"} className="text-blue-400 font-medium">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
