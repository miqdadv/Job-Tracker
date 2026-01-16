import React from "react";
import { useSelector } from "react-redux";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  X,
  Briefcase,
  DollarSign,
  MapPin,
  Clock,
  Loader2,
  Users,
} from "lucide-react";
import { useCreateApplication } from "@/hooks/useTrackerApi";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";

const JobDetailsPopover = ({ job, children }) => {
  const [open, setOpen] = React.useState(false);
  const [isApplying, setIsApplying] = React.useState(false);
  const { createApplication } = useCreateApplication();
  const { trackedApplications } = useSelector((store) => store.tracker);

  // Check if already applied to this job
  const isAlreadyApplied = trackedApplications.some(
    (app) =>
      app.companyName?.toLowerCase() === job?.company?.name?.toLowerCase() &&
      app.role?.toLowerCase() === job?.title?.toLowerCase()
  );

  const handleApply = async () => {
    if (isAlreadyApplied || !job?._id) return;

    setIsApplying(true);
    try {
      // First, create the actual application in the database
      const response = await axios.get(
        `${APPLICATION_API_ENDPOINT}/apply/${job._id}`,
        { withCredentials: true }
      );

      if (response.data.success) {
        // Also add to personal tracker
        await createApplication({
          companyName: job.company?.name,
          role: job.title,
          status: "Applied",
          appliedDate: new Date().toISOString(),
        });

        toast.success("Application submitted successfully!");
        setOpen(false);
      }
    } catch (error) {
      const message = error.response?.data?.message || "Failed to apply";
      toast.error(message);
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-96 p-0 max-h-[85vh] overflow-y-auto" side="top" align="start" collisionPadding={16}>
        {/* Header with close button */}
        <div className="flex justify-between items-center p-4 border-b bg-gray-50">
          <h3 className="font-semibold text-lg truncate pr-2">{job?.title}</h3>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={() => setOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Company info */}
        <div className="flex items-center gap-3 p-4 border-b">
          <Avatar className="h-12 w-12">
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
          <div>
            <p className="font-medium">{job?.company?.name}</p>
            <p className="text-sm text-gray-500">{job?.location}</p>
          </div>
        </div>

        {/* Styled info sections */}
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-3">
            <Briefcase className="h-5 w-5 text-blue-500 shrink-0" />
            <span className="text-sm font-medium text-gray-600">Role:</span>
            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
              {job?.title}
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <DollarSign className="h-5 w-5 text-green-500 shrink-0" />
            <span className="text-sm font-medium text-gray-600">Salary:</span>
            <Badge
              variant="outline"
              className="border-green-300 text-green-700"
            >
              {job?.salary} LPA
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-red-500 shrink-0" />
            <span className="text-sm font-medium text-gray-600">Location:</span>
            <Badge variant="outline" className="border-red-300 text-red-700">
              {job?.location}
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-purple-500 shrink-0" />
            <span className="text-sm font-medium text-gray-600">Type:</span>
            <Badge variant="secondary" className="text-purple-700">
              {job?.jobType}
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-orange-500 shrink-0" />
            <span className="text-sm font-medium text-gray-600">Openings:</span>
            <Badge variant="secondary" className="text-orange-700">
              {job?.position} positions
            </Badge>
          </div>
        </div>

        {/* Description */}
        <div className="px-4 pb-4">
          <p className="text-sm text-gray-600 line-clamp-3">{job?.description}</p>
        </div>

        {/* Requirements if available */}
        {job?.requirements?.length > 0 && (
          <div className="px-4 pb-4">
            <p className="text-sm font-medium text-gray-600 mb-2">
              Requirements:
            </p>
            <div className="flex flex-wrap gap-1">
              {job.requirements.slice(0, 5).map((req, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {req}
                </Badge>
              ))}
              {job.requirements.length > 5 && (
                <Badge variant="outline" className="text-xs">
                  +{job.requirements.length - 5} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Apply button */}
        <div className="p-4 border-t bg-gray-50">
          <Button
            onClick={handleApply}
            disabled={isApplying || isAlreadyApplied}
            className="w-full bg-[#ff7171] hover:bg-[#ff5c5c] disabled:opacity-50"
          >
            {isApplying ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Applying...
              </>
            ) : isAlreadyApplied ? (
              "Already Applied"
            ) : (
              "Apply Now"
            )}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default JobDetailsPopover;
