import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { motion } from "motion/react";
import { LogOutIcon, User, Sun, Moon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/data";
import { setUser } from "@/redux/slices/authSlice";
import { useTheme } from "../ui/theme-provider";
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const { theme, toggleTheme } = useTheme();

  const logoutHandler = async () => {
    try {
      const response = await axios.post(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true,
      });
      if (response.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success("Logged out successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between mx-[5%] max-w-7xl h-16">
        <Link to="/home">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 cursor-pointer">
            Job<span className="text-[#ff7171]">Tracker</span>
          </h1>
        </Link>
        <div className="flex items-center gap-6">
          <ul className="flex font-medium items-center gap-6 text-gray-700 dark:text-gray-300">
            {user?.role === "Recruiter" ? (
              <motion.li
                whileHover={{ scale: 1.1, cursor: "pointer", color: "#ff7171" }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to={"/recruiter/dashboard"}>Dashboard</Link>
              </motion.li>
            ) : (
              <>
                <motion.li
                  whileHover={{ scale: 1.1, cursor: "pointer", color: "#ff7171" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to={"/home"}>Home</Link>
                </motion.li>
                <motion.li
                  whileHover={{ scale: 1.1, cursor: "pointer", color: "#ff7171" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to={"/browse"}>Browse</Link>
                </motion.li>
                <motion.li
                  whileHover={{ scale: 1.1, cursor: "pointer", color: "#ff7171" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to={"/jobs"}>Jobs</Link>
                </motion.li>
                {user && (
                  <motion.li
                    whileHover={{ scale: 1.1, cursor: "pointer", color: "#ff7171" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link to={"/tracker"}>Tracker</Link>
                  </motion.li>
                )}
              </>
            )}
          </ul>
          {/* Theme Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-yellow-500" />
            ) : (
              <Moon className="h-5 w-5 text-gray-700" />
            )}
          </Button>
          {!user ? (
            <div className="flex items-center">
              <Link to={"/login"}>
                <Button variant="outline" className="cursor-pointer">
                  Login
                </Button>
              </Link>
              <Link to={"/register"}>
                <Button className="bg-[#ff7171] hover:bg-[#ff5555] text-white cursor-pointer ml-2">
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-60 mr-4 mt-2">
                <div className="flex items-center gap-4 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" />
                  </Avatar>
                  <div>
                    <h3 className="font-medium dark:text-gray-100">{user?.fullName}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <div className="flex w-fit items-center gap-2 my-2">
                    {/* <User></User> */}
                    <Link to={"/profile"}>
                      <Button variant="secondary" className="cursor-pointer">
                        <User></User>
                        Profile
                      </Button>
                    </Link>
                  </div>
                  <div className="flex w-fit items-center gap-2 my-2">
                    {/* <LogOutIcon></LogOutIcon> */}
                    <Button
                      onClick={logoutHandler}
                      variant="destructive"
                      className="cursor-pointer"
                    >
                      <LogOutIcon></LogOutIcon>
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
