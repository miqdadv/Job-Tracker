import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { setSearchedQuery } from "@/redux/slices/jobSlice";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      dispatch(setSearchedQuery(searchQuery.trim()));
      navigate("/browse");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <div className="text-center">
        <div className="flex flex-col gap-5 my-10">
          <h2 className="text-5xl font-semibold">
            Track, Organize and <br />
            Optimize your <span className="text-[#ff7171]">
              Job Search
            </span>{" "}
          </h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum quos
            dolores atque porro nisi quibusdam.
          </p>
          {/* search input */}
          <div className="flex w-[40%] shadow-lg border border-gray-400 rounded-full gap-4 mx-auto p-1 mt-8">
            <input
              type="text"
              placeholder="Search your job..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="outline-none border-none w-full ml-2 text-gray-400 font-semibold"
            />
            <Button onClick={handleSearch} className="bg-[#ff7171] rounded-full">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
