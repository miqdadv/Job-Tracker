import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import ApplicationForm from "./ApplicationForm";
import { useUpdateApplication } from "@/hooks/useTrackerApi";

const validateForm = (data) => {
  const errors = {};

  if (!data.companyName.trim()) {
    errors.companyName = "Company name is required";
  }

  if (!data.role.trim()) {
    errors.role = "Role is required";
  }

  if (!data.status) {
    errors.status = "Status is required";
  }

  if (!data.appliedDate) {
    errors.appliedDate = "Applied date is required";
  } else {
    const date = new Date(data.appliedDate);
    if (isNaN(date.getTime())) {
      errors.appliedDate = "Invalid date format";
    }
  }

  return errors;
};

const formatDateForInput = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

const EditApplicationModal = ({ open, setOpen, application }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    role: "",
    status: "Applied",
    appliedDate: "",
  });
  const [errors, setErrors] = useState({});
  const { updateApplication, loading } = useUpdateApplication();

  useEffect(() => {
    if (application) {
      setFormData({
        companyName: application.companyName || "",
        role: application.role || "",
        status: application.status || "Applied",
        appliedDate: formatDateForInput(application.appliedDate),
      });
    }
  }, [application]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    const result = await updateApplication(application._id, formData);

    if (result.success) {
      setOpen(false);
    }
  };

  const handleOpenChange = (isOpen) => {
    if (!isOpen) {
      setErrors({});
    }
    setOpen(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent onInteractOutside={() => handleOpenChange(false)}>
        <DialogHeader>
          <DialogTitle>Edit Application</DialogTitle>
          <DialogDescription>
            Update the details of your tracked application.
          </DialogDescription>
        </DialogHeader>
        <ApplicationForm
          formData={formData}
          onChange={setFormData}
          onSubmit={handleSubmit}
          loading={loading}
          submitLabel="Update Application"
          errors={errors}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditApplicationModal;
