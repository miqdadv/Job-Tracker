import React, { useState } from "react";
import Navbar from "./Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "../ui/badge";
import EditProfileModal from "./EditProfileModal";
import { useSelector } from "react-redux";
import store from "@/redux/store";

const Profile = () => {
  const { user } = useSelector((store) => store.auth);
  const isRecruiter = user?.role === "Recruiter";
  const isHavingResume = user?.profile?.resume;
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg my-5 p-8 shadow-lg">
        <div className="flex justify-between">
          <div className="flex items-center gap-5">
            <Avatar className="cursor-pointer h-15 w-15">
              <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>
            <div>
              <h1 className="font-bold text-[#ff7171] text-xl">{user?.fullName}</h1>
              <p className="text-gray-600 dark:text-gray-400">{user?.profile?.bio}</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} className="text-right" variant="outline">
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2 text-gray-700 dark:text-gray-300">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2 text-gray-700 dark:text-gray-300">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        {!isRecruiter && (
          <>
            <div>
              <div className="my-5">
                <h1 className="font-semibold text-gray-800 dark:text-gray-200">Skills</h1>
                <div className="flex items-center gap-1 mt-2">
                  {user?.profile?.skills?.length > 0 ? (
                    user?.profile?.skills.map((skill, index) => (
                      <Badge variant="outline" key={index}>
                        {skill}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-gray-500">NA</span>
                  )}
                </div>
              </div>
            </div>
            <div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <label className="font-semibold text-gray-800 dark:text-gray-200">Resume</label>
                <div>
                  {isHavingResume ? (
                    <a
                      className="text-blue-400 hover:underline"
                      target="_blank"
                      href={user?.profile?.resume}
                    >
                      View Resume
                    </a>
                  ) : (
                    <span className="text-gray-500">No Resume</span>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <EditProfileModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
