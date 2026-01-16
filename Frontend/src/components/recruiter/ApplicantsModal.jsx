import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Mail, Phone, FileText, User, Calendar, Check, X } from "lucide-react";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";

const ApplicantsModal = ({ job, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [applicants, setApplicants] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchApplicants();
  }, [job._id]);

  const fetchApplicants = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${APPLICATION_API_ENDPOINT}/${job._id}/applicants`,
        { withCredentials: true }
      );
      if (response.data.success) {
        setApplicants(response.data.job.applications || []);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch applicants");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (applicationId, status) => {
    try {
      setUpdatingId(applicationId);
      const response = await axios.post(
        `${APPLICATION_API_ENDPOINT}/status/${applicationId}/update`,
        { status },
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success(`Application ${status}`);
        setApplicants((prev) =>
          prev.map((app) =>
            app._id === applicationId ? { ...app, status: status.toLowerCase() } : app
          )
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      accepted: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    };
    return (
      <Badge className={statusStyles[status] || statusStyles.pending}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Applicants for {job.title}
            <Badge variant="secondary">{applicants.length} total</Badge>
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Spinner className="w-8 h-8" />
          </div>
        ) : applicants.length === 0 ? (
          <div className="text-center py-12">
            <User className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              No Applicants Yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              No one has applied for this position yet.
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Applicant</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Applied On</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applicants.map((application) => (
                <TableRow key={application._id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-500" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          {application.applicant?.fullName || "Unknown"}
                        </p>
                        {application.applicant?.profile?.bio && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[200px]">
                            {application.applicant.profile.bio}
                          </p>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Mail className="w-3 h-3 mr-1" />
                        {application.applicant?.email || "N/A"}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Phone className="w-3 h-3 mr-1" />
                        {application.applicant?.phoneNumber || "N/A"}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(application.createdAt)}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(application.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {application.applicant?.profile?.resume && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            window.open(application.applicant.profile.resume, "_blank")
                          }
                        >
                          <FileText className="w-4 h-4 mr-1" />
                          Resume
                        </Button>
                      )}
                      {application.status === "pending" && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={updatingId === application._id}
                            onClick={() => updateStatus(application._id, "accepted")}
                            className="text-green-600 hover:text-green-700 hover:bg-green-50"
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={updatingId === application._id}
                            onClick={() => updateStatus(application._id, "rejected")}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <div className="flex justify-end pt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicantsModal;
