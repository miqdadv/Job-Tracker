import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import ApplicationForm from "./ApplicationForm";
import { useCreateApplication } from "@/hooks/useTrackerApi";

const getInitialFormData = () => ({
  companyName: "",
  role: "",
  status: "Applied",
  appliedDate: new Date().toISOString().split("T")[0],
});

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

const AddApplicationModal = ({ open, setOpen }) => {
  const [formData, setFormData] = useState(getInitialFormData);
  const [errors, setErrors] = useState({});
  const { createApplication, loading } = useCreateApplication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    const result = await createApplication(formData);

    if (result.success) {
      setFormData(getInitialFormData());
      setOpen(false);
    }
  };

  const handleOpenChange = (isOpen) => {
    if (!isOpen) {
      setFormData(getInitialFormData());
      setErrors({});
    }
    setOpen(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent onInteractOutside={() => handleOpenChange(false)}>
        <DialogHeader>
          <DialogTitle>Add New Application</DialogTitle>
          <DialogDescription>
            Track a new job application you've submitted.
          </DialogDescription>
        </DialogHeader>
        <ApplicationForm
          formData={formData}
          onChange={setFormData}
          onSubmit={handleSubmit}
          loading={loading}
          submitLabel="Add Application"
          errors={errors}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddApplicationModal;
