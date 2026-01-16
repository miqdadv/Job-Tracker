import React, { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  MapPin,
  Briefcase,
  IndianRupee,
  Clock,
  Users,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";

const RecruiterJobCard = ({ job, onEdit, onDelete, onViewApplicants }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {job.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {job.company?.name || "Unknown Company"}
            </p>
          </div>
          <Badge variant="secondary" className="text-xs">
            {job.jobType}
          </Badge>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {job.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <MapPin className="w-4 h-4 mr-2" />
            {job.location}
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <IndianRupee className="w-4 h-4 mr-2" />
            {job.salary} LPA
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Briefcase className="w-4 h-4 mr-2" />
            {job.experience} years experience
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Users className="w-4 h-4 mr-2" />
            {job.position} positions
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {job.requirements?.slice(0, 3).map((req, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {req.trim()}
            </Badge>
          ))}
          {job.requirements?.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{job.requirements.length - 3} more
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <Clock className="w-3 h-3 mr-1" />
            Posted {formatDate(job.createdAt)}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onEdit}
              className="text-blue-600 hover:text-blue-700"
            >
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDeleteConfirm(true)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </Button>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="outline"
            size="sm"
            onClick={onViewApplicants}
            className="w-full justify-center"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Applicants
            {job.applications?.length > 0 && (
              <Badge className="ml-2 bg-[#ff7171] text-white">
                {job.applications.length}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Job</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{job.title}"? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteConfirm(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                onDelete();
                setShowDeleteConfirm(false);
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RecruiterJobCard;
