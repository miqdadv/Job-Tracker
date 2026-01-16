import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/slices/jobSlice";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Button } from "../ui/button";

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Mobile App Developer",
  "UI / UX Designer",
  "Data Analyst",
  "Data Scientist",
  "DevOps Engineer",
  "QA / Test Engineer",
  "Product Manager",
];

const Categories = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCategoryClick = (category) => {
    dispatch(setSearchedQuery(category));
    navigate("/jobs");
  };

  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-15">
        <CarouselContent>
          {categories.map((category, index) => {
            return (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Button onClick={() => handleCategoryClick(category)}>
                  {category}
                </Button>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Categories;
